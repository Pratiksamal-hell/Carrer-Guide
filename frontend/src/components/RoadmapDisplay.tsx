import { PhaseCard } from './PhaseCard'
import { ToolsSection } from './ToolsSection'
import type { RoadmapData } from '../types'

interface RoadmapDisplayProps {
  roadmap: RoadmapData
}

export function RoadmapDisplay({ roadmap }: RoadmapDisplayProps) {
  return (
    <section className="animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-8 w-1 bg-primary rounded-full" />
        <h2 className="text-2xl font-bold text-foreground">Your Learning Roadmap</h2>
      </div>

      {/* Phases */}
      <div className="space-y-6 mb-10">
        {roadmap.phases.map((phase, index) => (
          <PhaseCard key={index} phase={phase} index={index} />
        ))}
      </div>

      {/* Tools */}
      {roadmap.tools && roadmap.tools.length > 0 && (
        <ToolsSection tools={roadmap.tools} />
      )}
    </section>
  )
}
