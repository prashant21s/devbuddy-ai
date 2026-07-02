import { NextResponse } from "next/server"

const demoJobs = [
  {
    title: "SDE Intern - Full Stack",
    company: "Microsoft India",
    location: "Bangalore",
    requiredSkills: ["React", "Node.js", "Azure", "DSA"],
  },
  {
    title: "Backend Developer - New Grad",
    company: "Zepto",
    location: "Remote",
    requiredSkills: ["Node.js", "PostgreSQL", "Redis", "System Design"],
  },
  {
    title: "ML Engineer Intern",
    company: "Swiggy",
    location: "Bangalore",
    requiredSkills: ["Python", "TensorFlow", "MLOps", "SQL"],
  },
]

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const skills: string[] = Array.isArray(body.skills)
    ? body.skills.map(String)
    : ["React", "Node.js", "SQL"]

  const matches = demoJobs.map((job) => {
    const overlap = job.requiredSkills.filter((skill) =>
      skills.some((candidateSkill) => candidateSkill.toLowerCase() === skill.toLowerCase()),
    )
    const missingSkills = job.requiredSkills.filter((skill) => !overlap.includes(skill))

    return {
      ...job,
      matchScore: Math.round((overlap.length / job.requiredSkills.length) * 100),
      missingSkills,
      source: "demo",
    }
  })

  return NextResponse.json({
    matches: matches.sort((a, b) => b.matchScore - a.matchScore),
    nextIntegration:
      "Generate resume embeddings, upsert to Pinecone, fetch jobs from JSearch or approved job APIs, then rank with cosine similarity plus skill overlap.",
  })
}
