import { createInterviewPrompt, demoSkillMetrics, findWeakAreas } from "@/lib/devbuddy"
import { callGemini } from "@/lib/ai"
import { NextResponse } from "next/server"

type FrontendMessage = {
  role: "ai" | "user"
  text: string
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const company = String(body.company ?? "Google")
  const weakAreas = Array.isArray(body.weakAreas)
    ? body.weakAreas.map(String)
    : findWeakAreas(demoSkillMetrics, 3)
  const latestAnswer = String(body.answer ?? "").trim()
  const history: FrontendMessage[] = Array.isArray(body.history) ? body.history : []

  const systemPrompt = createInterviewPrompt(company, weakAreas)

  // Convert frontend history into Gemini's expected format
  const conversation = history.map((m) => ({
    role: m.role === "ai" ? ("assistant" as const) : ("user" as const),
    content: m.text,
  }))

  // Add the latest answer as the newest user turn
  if (latestAnswer) {
    conversation.push({
      role: "user" as const,
      content: `${latestAnswer}\n\n(Ask one relevant follow-up question based on this answer and the conversation so far. Give short feedback too.)`,
    })
  }

  const geminiResponse = latestAnswer
    ? await callGemini(systemPrompt, conversation)
    : null

  return NextResponse.json({
    systemPrompt,
    provider: geminiResponse ? "gemini" : "deterministic-demo",
    message: geminiResponse ??
      (latestAnswer
        ? "Good. Now quantify the tradeoff: what is the time complexity, where does the approach fail, and what test case proves it?"
        : `Let's start with ${weakAreas[0]}. Design a cache for a job recommendation feed. Which data would you cache and how would you invalidate it?`),
    feedback: latestAnswer && !geminiResponse
      ? "You gave a directionally useful answer. Add complexity analysis, edge cases, and one concrete example to make it interview-ready."
      : null,
  })
}