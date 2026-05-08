import { Loader2 } from 'lucide-react'

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-foreground">Crafting your roadmap</h3>
      <p className="mt-2 text-muted-foreground text-center max-w-sm">
        Our AI is analyzing your goals and creating a personalized learning path...
      </p>
    </div>
  )
}
