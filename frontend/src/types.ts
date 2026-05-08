export interface Project {
  name: string
  description: string
}

export interface Phase {
  title: string
  duration: string
  skills: string[]
  projects: Project[]
}

export interface Tool {
  name: string
  description: string
}

export interface RoadmapData {
  phases: Phase[]
  tools: Tool[]
}
