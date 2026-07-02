import { calculatePlacementScore, demoSkillMetrics, findWeakAreas } from "@/lib/devbuddy"

export const candidate = {
  name: "Prashant Kumar",
  initials: "PK",
  degree: "B.Tech Computer Science",
  year: "Final year",
  targetCompany: "Product-based SDE roles",
  weeklyHours: 12,
  skills: ["React", "Node.js", "PostgreSQL", "Python", "SQL", "DSA"],
}

export const sourceAnalyses = [
  {
    source: "Resume",
    status: "Connected",
    score: 81,
    summary: "Strong project descriptions and measurable impact. Add sharper system design keywords.",
    metrics: ["4 projects", "ATS ready", "2 gaps"],
  },
  {
    source: "GitHub",
    status: "Connected",
    score: 62,
    summary: "Good full-stack work, but README quality and recent commit rhythm need improvement.",
    metrics: ["18 repos", "6 active", "README 58%"],
  },
  {
    source: "LeetCode",
    status: "Connected",
    score: 74,
    summary: "Solid easy and medium coverage. Hard DP and graph problems are the next focus.",
    metrics: ["148 solved", "79 medium", "7 hard"],
  },
  {
    source: "Portfolio",
    status: "Needs work",
    score: 48,
    summary: "Portfolio URL is pending. Add live links, case studies, and deployment proof.",
    metrics: ["0 live links", "0 case studies", "Pending scan"],
  },
]

export const scoreBreakdown = {
  dsa: 74,
  projects: 76,
  resume: 81,
  github: 62,
  communication: 68,
}

export const placementScore = calculatePlacementScore(scoreBreakdown)
export const weakAreas = findWeakAreas(demoSkillMetrics)

export const roadmapSeed = [
  {
    week: "Week 1",
    title: "System Design Foundations",
    status: "active",
    outcomes: ["Caching strategies", "Load balancers", "One design mock interview"],
  },
  {
    week: "Week 2",
    title: "DevOps and Deployment",
    status: "todo",
    outcomes: ["Docker basics", "CI pipeline", "Production env checklist"],
  },
  {
    week: "Week 3",
    title: "OS and DBMS Revision",
    status: "todo",
    outcomes: ["Scheduling", "Transactions", "Indexing practice"],
  },
  {
    week: "Week 4",
    title: "Resume and GitHub Polish",
    status: "todo",
    outcomes: ["Project metrics", "README templates", "Portfolio live links"],
  },
]

export const pipeline = [
  "Resume PDF text extraction",
  "GitHub repository scoring",
  "LeetCode topic analysis",
  "Portfolio link and stack scan",
  "Placement score refresh",
  "Roadmap and job matching",
]
