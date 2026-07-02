"use client"

import { useEffect, useState } from "react"
import { candidate } from "@/lib/demo-data"

type JobMatch = {
  title: string
  company: string
  location: string
  requiredSkills: string[]
  missingSkills: string[]
  matchScore: number
  source: string
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadJobs() {
      const response = await fetch("/api/jobs/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: candidate.skills }),
      })
      const data = await response.json()
      setJobs(data.matches ?? [])
      setLoading(false)
    }

    loadJobs()
  }, [])

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">Job matching</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Recommended roles</h1>
        <p className="mt-2 text-slate-400">
          Matches are ranked with skill overlap now and ready for embeddings plus Pinecone search later.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {["All", "80+ Match", "Internship", "New Grad", "Remote"].map((filter, index) => (
          <button
            key={filter}
            className={`rounded-lg px-3 py-2 text-xs transition ${
              index === 0 ? "bg-cyan-400 text-slate-950" : "bg-slate-900 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">
          Matching jobs...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <article key={`${job.company}-${job.title}`} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">{job.company}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{job.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">{job.location}</p>
                </div>
                <span className="text-2xl font-semibold text-cyan-300">{job.matchScore}%</span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-cyan-400" style={{ width: `${job.matchScore}%` }} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.requiredSkills.map((skill) => (
                  <span key={skill} className="rounded bg-slate-950 px-2 py-1 text-xs text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                Missing: {job.missingSkills.length ? job.missingSkills.join(", ") : "None"}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
