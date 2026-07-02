import { demoSkillMetrics, findWeakAreas } from "@/lib/devbuddy"
import { NextResponse } from "next/server"

const sourceScores = {
  resume: 81,
  github: 62,
  leetcode: 74,
  portfolio: 48,
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const source = String(body.source ?? "resume").toLowerCase()

  if (!Object.hasOwn(sourceScores, source)) {
    return NextResponse.json(
      { error: "source must be one of resume, github, leetcode, portfolio" },
      { status: 400 },
    )
  }

  return NextResponse.json({
    source,
    status: "complete",
    score: sourceScores[source as keyof typeof sourceScores],
    skills: demoSkillMetrics.filter((skill) => skill.score >= 65).map((skill) => skill.name),
    gaps: findWeakAreas(demoSkillMetrics),
    summary:
      "Demo analyzer response. Replace this adapter with PyMuPDF, GitHub REST, LeetCode GraphQL, or Puppeteer based on the selected source.",
    nextIntegration:
      source === "resume"
        ? "Send uploaded PDF text to the AI microservice for skill, project, and gap extraction."
        : "Call the provider adapter, normalize metrics, persist ProfileAnalysis, then recalculate placement score.",
  })
}
