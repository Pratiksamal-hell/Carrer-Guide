import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">CareerPath AI</h1>
            <p className="text-sm text-muted-foreground">Your personalized learning roadmap</p>
          </div>
        </div>
      </div>
    </header>
  )
}
