import { Clock, BookOpen, Briefcase, ChevronRight } from 'lucide-react'
import type { Phase } from '../types'

interface PhaseCardProps {
  phase: Phase
  index: number
}

export function PhaseCard({ phase, index }: PhaseCardProps) {
  return (
    <div className="group bg-card rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
      {/* Phase Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary font-bold text-lg shrink-0">
            {index + 1}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {phase.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{phase.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Content */}
      <div className="p-6 grid md:grid-cols-2 gap-6">
        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-accent" />
            <h4 className="font-medium text-foreground">Skills to Learn</h4>
          </div>
          <ul className="space-y-2">
            {phase.skills.map((skill, skillIndex) => (
              <li key={skillIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Projects */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Briefcase className="w-4 h-4 text-accent" />
            <h4 className="font-medium text-foreground">Projects</h4>
          </div>
          <div className="space-y-3">
            {phase.projects.map((project, projectIndex) => (
              <div
                key={projectIndex}
                className="p-3 rounded-xl bg-secondary/50 border border-border"
              >
                <h5 className="font-medium text-foreground text-sm">{project.name}</h5>
                <p className="text-xs text-muted-foreground mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
