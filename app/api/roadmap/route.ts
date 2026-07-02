import { demoSkillMetrics, findWeakAreas } from "@/lib/devbuddy"
import { callGemini } from "@/lib/ai"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const targetCompany = String(body.targetCompany ?? "product companies")
  const weeklyHours = Number(body.weeklyHours ?? 10)
  const weakAreas = findWeakAreas(demoSkillMetrics, 5)
  const system =
    "Return only compact JSON with a roadmap array. Each item must include week, title, outcomes, and hours."
  const generated = await callGemini(system, [
    {
      role: "user",
      content: `Create a weekly placement roadmap for ${targetCompany}. Weak areas: ${weakAreas.join(", ")}. Available hours per week: ${weeklyHours}.`,
    },
  ])

  if (generated) {
    try {
      return NextResponse.json({
        targetCompany,
        weeklyHours,
        provider: "gemini",
        ...JSON.parse(generated),
      })
    } catch {
      return NextResponse.json({
        targetCompany,
        weeklyHours,
        provider: "gemini-text",
        roadmap: [
          {
            week: "Week 1",
            title: "AI-generated roadmap",
            outcomes: [generated],
            hours: weeklyHours,
          },
        ],
      })
    }
  }

  return NextResponse.json({
    targetCompany,
    weeklyHours,
    provider: "deterministic-demo",
    roadmap: weakAreas.map((area, index) => ({
      week: `Week ${index + 1}`,
      title: `${area} sprint`,
      outcomes: [
        `Study core ${area} patterns`,
        "Build one small proof project or solve focused problems",
        "Finish with one mock interview checkpoint",
      ],
      hours: Math.max(4, Math.round(weeklyHours / 2)),
    })),
  })
}