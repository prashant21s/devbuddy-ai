"use client"

import { useState } from "react"
import { candidate, placementScore, sourceAnalyses } from "@/lib/demo-data"

type AnalysisResult = {
  source: string
  status: string
  score: number
  skills: string[]
  gaps: string[]
  summary: string
  nextIntegration: string
}

export default function ProfilePage() {
  const [selectedSource, setSelectedSource] = useState("resume")
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)

  async function analyze() {
    setLoading(true)
    const response = await fetch("/api/profile/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: selectedSource, portfolioUrl }),
    })
    const data = await response.json()
    setResult(data)
    setLoading(false)
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">Profile analyzer</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Connected career profile</h1>
        <p className="mt-2 text-slate-400">
          Upload or connect sources, normalize them into skill signals, and refresh placement readiness.
        </p>
      </div>

      <section className="mb-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-400 text-xl font-bold text-slate-950">
              {candidate.initials}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">{candidate.name}</h2>
              <p className="text-sm text-slate-400">
                {candidate.degree} - {candidate.year}
              </p>
              <p className="mt-1 text-xs text-slate-500">{candidate.targetCompany}</p>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-4">
            <p className="text-sm text-slate-400">Placement score</p>
            <p className="mt-2 text-4xl font-semibold text-white">{placementScore}</p>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Run analyzer</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-[180px_1fr_auto]">
            <select
              value={selectedSource}
              onChange={(event) => setSelectedSource(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
            >
              <option value="resume">Resume</option>
              <option value="github">GitHub</option>
              <option value="leetcode">LeetCode</option>
              <option value="portfolio">Portfolio</option>
            </select>
            <input
              value={portfolioUrl}
              onChange={(event) => setPortfolioUrl(event.target.value)}
              className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
              placeholder="Profile URL, username, or upload reference"
            />
            <button
              onClick={analyze}
              disabled={loading}
              className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {loading ? "Analyzing" : "Analyze"}
            </button>
          </div>

          {result && (
            <div className="mt-5 rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white">{result.source.toUpperCase()} analysis</p>
                <span className="text-sm font-semibold text-cyan-300">{result.score}/100</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-300">{result.summary}</p>
              <p className="mt-3 text-xs leading-5 text-slate-500">{result.nextIntegration}</p>
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {sourceAnalyses.map((source) => (
          <div key={source.source} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white">{source.source}</h2>
                <p className="mt-1 text-sm text-slate-400">{source.summary}</p>
              </div>
              <span className="rounded bg-slate-800 px-3 py-1 text-sm font-semibold text-cyan-300">
                {source.score}
              </span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {source.metrics.map((metric) => (
                <span key={metric} className="rounded bg-slate-950 px-2 py-1 text-xs text-slate-300">
                  {metric}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
