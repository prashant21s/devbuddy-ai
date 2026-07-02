import { createInterviewPrompt, demoSkillMetrics, findWeakAreas } from "@/lib/devbuddy"
import { callClaude } from "@/lib/ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const company = String(body.company ?? "Google")
  const weakAreas = Array.isArray(body.weakAreas)
    ? body.weakAreas.map(String)
    : findWeakAreas(demoSkillMetrics, 3)
  const latestAnswer = String(body.answer ?? "").trim()
  const systemPrompt = createInterviewPrompt(company, weakAreas)
  const claudeResponse = latestAnswer
    ? await callClaude(systemPrompt, [
        {
          role: "user",
          content: `Candidate answer: ${latestAnswer}\n\nAsk one follow-up question and give short feedback.`,
        },
      ])
    : null

  return NextResponse.json({
    systemPrompt,
    provider: claudeResponse ? "claude" : "deterministic-demo",
    message: claudeResponse ??
      (latestAnswer
      ? "Good. Now quantify the tradeoff: what is the time complexity, where does the approach fail, and what test case proves it?"
      : `Let's start with ${weakAreas[0]}. Design a cache for a job recommendation feed. Which data would you cache and how would you invalidate it?`),
    feedback: latestAnswer
      ? "You gave a directionally useful answer. Add complexity analysis, edge cases, and one concrete example to make it interview-ready."
      : null,
  })
}
