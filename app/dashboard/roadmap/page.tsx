"use client"

import { useState } from "react"
import { candidate, roadmapSeed } from "@/lib/demo-data"

type RoadmapItem = {
  week: string
  title: string
  outcomes: string[]
  hours?: number
}

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(roadmapSeed)
  const [weeklyHours, setWeeklyHours] = useState(candidate.weeklyHours)
  const [targetCompany, setTargetCompany] = useState(candidate.targetCompany)
  const completed = 1
  const progress = Math.round((completed / roadmap.length) * 100)

  async function generateRoadmap() {
    const response = await fetch("/api/roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weeklyHours, targetCompany }),
    })
    const data = await response.json()
    setRoadmap(data.roadmap ?? roadmapSeed)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">Roadmap generator</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Weekly placement plan</h1>
        <p className="mt-2 text-slate-400">
          The backend returns structured JSON that the frontend renders as an execution timeline.
        </p>
      </div>

      <section className="mb-6 rounded-lg border border-slate-800 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-[1fr_140px_auto]">
          <input
            value={targetCompany}
            onChange={(event) => setTargetCompany(event.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
            placeholder="Target company or role"
          />
          <input
            value={weeklyHours}
            onChange={(event) => setWeeklyHours(Number(event.target.value))}
            className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
            min={4}
            max={40}
            type="number"
          />
          <button
            onClick={generateRoadmap}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Generate
          </button>
        </div>
        <div className="mt-6">
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-slate-400">Overall progress</span>
            <span className="font-medium text-white">{progress}% complete</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div className="h-full rounded-full bg-cyan-400" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <div className="grid gap-4">
        {roadmap.map((item, index) => {
          const isDone = index < completed
          const isActive = index === completed

          return (
            <article key={`${item.week}-${item.title}`} className="relative rounded-lg border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-sm font-semibold text-cyan-300">{item.week}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{item.title}</h2>
                </div>
                <span
                  className={`w-fit rounded px-3 py-1 text-xs ${
                    isDone
                      ? "bg-emerald-500/15 text-emerald-300"
                      : isActive
                        ? "bg-cyan-500/15 text-cyan-300"
                        : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {isDone ? "Completed" : isActive ? "In progress" : "Upcoming"}
                </span>
              </div>
              <div className="mt-4 grid gap-2 md:grid-cols-3">
                {item.outcomes.map((outcome) => (
                  <div key={outcome} className="rounded border border-slate-800 bg-slate-950 p-3 text-sm text-slate-300">
                    {outcome}
                  </div>
                ))}
              </div>
              {item.hours && <p className="mt-4 text-xs text-slate-500">Suggested effort: {item.hours} hours</p>}
            </article>
          )
        })}
      </div>
    </div>
  )
}
