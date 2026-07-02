"use client"

import { useState } from "react"
import { weakAreas } from "@/lib/demo-data"

type Message = {
  role: "ai" | "user"
  text: string
}

export default function InterviewPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: `I am your senior SDE interviewer. We will focus on ${weakAreas.slice(0, 3).join(", ")}. First question: design a cache for a job recommendation feed. What data would you cache and how would you invalidate it?`,
    },
  ])
  const [input, setInput] = useState("")
  const [company, setCompany] = useState("Google")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((current) => [...current, { role: "user", text: userMessage }])
    setLoading(true)

    const response = await fetch("/api/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        weakAreas,
        answer: userMessage,
        history: messages,
      }),
    })
    const data = await response.json()

    setMessages((current) => [
      ...current,
      {
        role: "ai",
        text: `${data.message}${data.feedback ? `\n\nFeedback: ${data.feedback}` : ""}`,
      },
    ])
    setLoading(false)
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-5xl flex-col">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-cyan-300">AI mock interview</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Practice session</h1>
          <p className="mt-2 text-slate-400">Multi-turn interview flow powered by the backend route handler.</p>
        </div>
        <select
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="w-fit rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400"
        >
          <option>Google</option>
          <option>Microsoft</option>
          <option>Amazon</option>
          <option>Razorpay</option>
        </select>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {["DSA", "System Design", "Behavioral"].map((topic, index) => (
          <button
            key={topic}
            className={`rounded-lg px-3 py-2 text-xs ${
              index === 1 ? "bg-cyan-400 text-slate-950" : "bg-slate-900 text-slate-300"
            }`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto rounded-lg border border-slate-800 bg-slate-900 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-2xl whitespace-pre-line rounded-lg px-4 py-3 text-sm leading-6 ${
                  message.role === "user" ? "bg-cyan-400 text-slate-950" : "bg-slate-950 text-slate-200"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && <div className="w-fit rounded-lg bg-slate-950 px-4 py-3 text-sm text-slate-400">Thinking...</div>}
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") sendMessage()
          }}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
          placeholder="Type your answer..."
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </div>
  )
}
