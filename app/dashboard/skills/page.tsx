import { demoSkillMetrics } from "@/lib/devbuddy"

function level(score: number) {
  if (score <= 30) return { label: "Critical", color: "text-rose-300", bar: "bg-rose-500" }
  if (score <= 45) return { label: "Weak", color: "text-amber-300", bar: "bg-amber-400" }
  if (score <= 65) return { label: "Average", color: "text-cyan-300", bar: "bg-cyan-400" }
  return { label: "Good", color: "text-emerald-300", bar: "bg-emerald-400" }
}

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">Skill graph</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Skills gap analysis</h1>
        <p className="mt-2 text-slate-400">
          Scores combine DSA coverage, project evidence, source analysis, and interview readiness.
        </p>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-4">
        {["Critical 0-30", "Weak 31-45", "Average 46-65", "Good 66+"].map((item) => (
          <div key={item} className="rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-300">
            {item}
          </div>
        ))}
      </div>

      <div className="grid gap-4">
        {demoSkillMetrics.map((skill) => {
          const state = level(skill.score)

          return (
            <section key={skill.name} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-white">{skill.name}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {skill.topics.map((topic) => (
                      <span key={topic} className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-2xl font-semibold text-white">{skill.score}%</p>
                  <p className={`text-sm ${state.color}`}>{state.label}</p>
                </div>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className={`h-full rounded-full ${state.bar}`} style={{ width: `${skill.score}%` }} />
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
