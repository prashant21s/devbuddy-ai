export type SkillMetric = {
  name: string
  score: number
  topics: string[]
}

export type PlacementScoreInput = {
  dsa: number
  projects: number
  resume: number
  github: number
  communication: number
}

export const placementWeights = {
  dsa: 0.3,
  projects: 0.25,
  resume: 0.2,
  github: 0.15,
  communication: 0.1,
} satisfies Record<keyof PlacementScoreInput, number>

export function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)))
}

export function calculatePlacementScore(input: PlacementScoreInput) {
  return clampScore(
    input.dsa * placementWeights.dsa +
      input.projects * placementWeights.projects +
      input.resume * placementWeights.resume +
      input.github * placementWeights.github +
      input.communication * placementWeights.communication,
  )
}

export function findWeakAreas(skills: SkillMetric[], limit = 4) {
  return [...skills]
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((skill) => skill.name)
}

export const demoSkillMetrics: SkillMetric[] = [
  { name: "System Design", score: 28, topics: ["Load Balancing", "Caching", "Sharding"] },
  { name: "DevOps / CI-CD", score: 35, topics: ["Docker", "GitHub Actions", "Linux"] },
  { name: "OS Concepts", score: 42, topics: ["Scheduling", "Memory", "Deadlocks"] },
  { name: "SQL & Databases", score: 55, topics: ["Joins", "Indexing", "Transactions"] },
  { name: "Machine Learning / AI", score: 71, topics: ["Python", "sklearn", "Neural Nets"] },
  { name: "Web Development", score: 78, topics: ["React", "Node.js", "REST APIs"] },
  { name: "Data Structures & Algorithms", score: 80, topics: ["Arrays", "Trees", "Graphs", "DP"] },
]

export function createInterviewPrompt(company: string, weakAreas: string[]) {
  return [
    `You are a senior SDE interviewer at ${company}.`,
    `Ask technical questions based on the student's weak areas: ${weakAreas.join(", ")}.`,
    "Evaluate answers, probe tradeoffs, and give concise actionable feedback.",
  ].join(" ")
}
