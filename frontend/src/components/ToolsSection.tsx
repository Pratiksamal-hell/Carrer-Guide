import { Wrench } from 'lucide-react'
import type { Tool } from '../types'

interface ToolsSectionProps {
  tools: Tool[]
}

export function ToolsSection({ tools }: ToolsSectionProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10">
          <Wrench className="w-4 h-4 text-accent" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Recommended Tools</h3>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-secondary/30 border border-border hover:border-accent/30 hover:bg-secondary/50 transition-all duration-200"
          >
            <h4 className="font-medium text-foreground">{tool.name}</h4>
            <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
