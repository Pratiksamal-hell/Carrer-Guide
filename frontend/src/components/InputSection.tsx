import { Target, GraduationCap, Rocket } from 'lucide-react'

interface InputSectionProps {
  goal: string
  setGoal: (value: string) => void
  level: string
  setLevel: (value: string) => void
  onGenerate: () => void
  isLoading: boolean
}

const skillLevels = [
  { value: 'beginner', label: 'Beginner', description: 'New to this field' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced professional' },
]

export function InputSection({
  goal,
  setGoal,
  level,
  setLevel,
  onGenerate,
  isLoading,
}: InputSectionProps) {
  return (
    <section className="mb-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
          Build Your Career Roadmap
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
          Enter your dream career and current skill level, and we&apos;ll generate a personalized
          learning path just for you.
        </p>
      </div>

      <div className="bg-card rounded-2xl shadow-lg shadow-primary/5 border border-border p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Career Goal Input */}
          <div className="space-y-2">
            <label htmlFor="goal" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <Target className="w-4 h-4 text-primary" />
              Career Goal
            </label>
            <input
              id="goal"
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g., Web Developer, Data Scientist, UX Designer"
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>

          {/* Skill Level Select */}
          <div className="space-y-2">
            <label htmlFor="level" className="flex items-center gap-2 text-sm font-medium text-foreground">
              <GraduationCap className="w-4 h-4 text-primary" />
              Skill Level
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Select your current level
              </option>
              {skillLevels.map((skillLevel) => (
                <option key={skillLevel.value} value={skillLevel.value}>
                  {skillLevel.label} - {skillLevel.description}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
        >
          <Rocket className="w-5 h-5" />
          {isLoading ? 'Generating...' : 'Generate Roadmap'}
        </button>
      </div>
    </section>
  )
}
