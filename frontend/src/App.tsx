import { useState } from 'react'
import { Header } from './components/Header'
import { InputSection } from './components/InputSection'
import { RoadmapDisplay } from './components/RoadmapDisplay'
import { LoadingState } from './components/LoadingState'
import { ErrorMessage } from './components/ErrorMessage'
import { LoginPage } from './components/LoginPage'
import { SignupPage } from './components/SignupPage'
import type { RoadmapData } from './types'

type AuthView = 'login' | 'signup'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authView, setAuthView] = useState<AuthView>('login')
  const [goal, setGoal] = useState('')
  const [level, setLevel] = useState('')
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (email: string, password: string) => {
    // Replace with your actual API call
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      throw new Error('Invalid email or password')
    }

    setIsAuthenticated(true)
  }

  const handleSignup = async (name: string, email: string, password: string) => {
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Signup failed. Please try again.')
    }

    setIsAuthenticated(true)
  }

  const handleGenerateRoadmap = async () => {
    if (!goal.trim()) {
      setError('Please enter a career goal')
      return
    }
    if (!level) {
      setError('Please select your skill level')
      return
    }

    setError(null)
    setIsLoading(true)
    setRoadmap(null)

    try {
      const response = await fetch('http://localhost:5000/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal, level }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate roadmap. Please try again.')
      }

      const data = await response.json()
      setRoadmap(data.roadmap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Show auth pages if not authenticated
  if (!isAuthenticated) {
    if (authView === 'signup') {
      return (
        <SignupPage
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthView('login')}
        />
      )
    }
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setAuthView('signup')}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <InputSection
          goal={goal}
          setGoal={setGoal}
          level={level}
          setLevel={setLevel}
          onGenerate={handleGenerateRoadmap}
          isLoading={isLoading}
        />
        
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
        
        {isLoading && <LoadingState />}
        
        {roadmap && !isLoading && <RoadmapDisplay roadmap={roadmap} />}
      </main>
    </div>
  )
}

export default App
