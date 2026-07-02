import {
  candidate,
  placementScore,
  pipeline,
  roadmapSeed,
  scoreBreakdown,
  sourceAnalyses,
  weakAreas,
} from "@/lib/demo-data"
import { demoSkillMetrics } from "@/lib/devbuddy"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    candidate,
    placementScore,
    scoreBreakdown,
    skills: demoSkillMetrics,
    weakAreas,
    sourceAnalyses,
    roadmap: roadmapSeed,
    pipeline,
  })
}
