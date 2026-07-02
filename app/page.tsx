import Link from "next/link"
import { pipeline, placementScore, weakAreas } from "@/lib/demo-data"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-cyan-300">
              Placement readiness cockpit
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-white md:text-6xl">
              DevBuddy AI
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Analyze resume, GitHub, LeetCode, and portfolio signals, then convert weak areas into mock interviews, job matches, and a weekly roadmap.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Open dashboard
              </Link>
              <Link
                href="/dashboard/interview"
                className="rounded-lg border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500"
              >
                Start interview
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-cyan-950/20">
            <div className="flex items-end justify-between border-b border-slate-800 pb-5">
              <div>
                <p className="text-sm text-slate-400">Placement score</p>
                <p className="mt-2 text-5xl font-semibold text-white">{placementScore}</p>
              </div>
              <span className="rounded bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">
                Ready for sprint
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              {weakAreas.map((area) => (
                <div key={area} className="flex items-center justify-between rounded border border-slate-800 bg-slate-950 px-4 py-3">
                  <span className="text-sm text-slate-300">{area}</span>
                  <span className="text-xs text-cyan-300">focus</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="mb-3 text-sm text-slate-400">Analysis pipeline</p>
              <div className="grid gap-2">
                {pipeline.slice(0, 4).map((step, index) => (
                  <div key={step} className="flex gap-3 text-sm text-slate-300">
                    <span className="text-cyan-300">0{index + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
