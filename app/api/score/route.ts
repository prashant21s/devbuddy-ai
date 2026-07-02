import { calculatePlacementScore } from "@/lib/devbuddy"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const score = calculatePlacementScore({
    dsa: Number(body.dsa ?? 0),
    projects: Number(body.projects ?? 0),
    resume: Number(body.resume ?? 0),
    github: Number(body.github ?? 0),
    communication: Number(body.communication ?? 0),
  })

  return NextResponse.json({
    score,
    formula: "(DSA * 0.30) + (Projects * 0.25) + (Resume * 0.20) + (GitHub * 0.15) + (Communication * 0.10)",
  })
}
