import Link from "next/link"
import {
  candidate,
  pipeline,
  placementScore,
  scoreBreakdown,
  sourceAnalyses,
  weakAreas,
} from "@/lib/demo-data"
import { demoSkillMetrics } from "@/lib/devbuddy"

const scoreCards = [
  { label: "Placement Score", value: `${placementScore}/100`, note: "Weighted readiness score" },
  { label: "DSA", value: `${scoreBreakdown.dsa}/100`, note: "LeetCode and topic spread" },
  { label: "Projects", value: `${scoreBreakdown.projects}/100`, note: "Resume and GitHub evidence" },
  { label: "Communication", value: `${scoreBreakdown.communication}/100`, note: "Interview response quality" },
]

const actions = [
  { href: "/dashboard/profile", title: "Analyze profile", desc: "Run resume, GitHub, LeetCode, and portfolio checks" },
  { href: "/dashboard/interview", title: "Start mock interview", desc: "Practice on your weakest skills" },
  { href: "/dashboard/jobs", title: "Browse job matches", desc: "Rank jobs against your current skill graph" },
  { href: "/dashboard/roadmap", title: "Generate roadmap", desc: "Turn gaps into weekly execution blocks" },
]

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">
            Full-stack demo
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Welcome back, {candidate.name}</h1>
          <p className="mt-2 text-slate-400">
            Your placement engine is tracking {weakAreas.length} priority gaps for {candidate.targetCompany}.
          </p>
        </div>
        <Link
          href="/dashboard/profile"
          className="w-fit rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Refresh analysis
        </Link>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        {scoreCards.map((card) => (
          <div key={card.label} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">{card.value}</p>
            <p className="mt-2 text-xs text-slate-400">{card.note}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Weak areas to fix</h2>
            <Link href="/dashboard/skills" className="text-sm text-cyan-300 hover:text-cyan-200">
              View all
            </Link>
          </div>
          <div className="grid gap-4">
            {demoSkillMetrics.slice(0, 6).map((skill) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-slate-300">{skill.name}</span>
                  <span className="text-sm text-slate-500">{skill.score}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full ${
                      skill.score < 35 ? "bg-rose-500" : skill.score < 60 ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Quick actions</h2>
          <div className="mt-5 grid gap-3">
            {actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-lg border border-slate-800 bg-slate-950 p-4 transition hover:border-cyan-500/60"
              >
                <p className="text-sm font-medium text-white">{action.title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{action.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Data sources</h2>
          <div className="mt-5 grid gap-3">
            {sourceAnalyses.map((source) => (
              <div key={source.source} className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">{source.source}</p>
                  <p className="text-xs text-slate-500">{source.status}</p>
                </div>
                <span className="text-sm font-semibold text-cyan-300">{source.score}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Backend pipeline</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {pipeline.map((step, index) => (
              <div key={step} className="rounded border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs font-semibold text-cyan-300">0{index + 1}</p>
                <p className="mt-2 text-sm text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
