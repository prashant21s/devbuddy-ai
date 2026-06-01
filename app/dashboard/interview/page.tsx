"use client"
import { useState } from "react"

export default function InterviewPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AI interviewer. Let's practice DSA today. 👋\n\nHere's your first question:\n\nGiven an array of integers, return indices of the two numbers that add up to a target. What's your approach?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = input
    setInput("")
    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setLoading(true)

    // Simulated AI response for now (real AI in Phase 7)
    setTimeout(() => {
      setMessages((prev) => [...prev, {
        role: "ai",
        text: "Good thinking! 💡 Using a hashmap is the optimal approach — O(n) time complexity.\n\nFollow-up: What's the space complexity? And how would you handle duplicate values in the array?"
      }])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-white">🤖 Mock Interview</h1>
        <p className="text-gray-400 mt-1">Practice with AI interviewer — DSA, System Design, HR</p>
      </div>

      {/* Topic Tabs */}
      <div className="flex gap-2 mb-4">
        {["DSA", "System Design", "HR / Behavioral"].map((tab, i) => (
          <button key={tab} className={`px-4 py-1.5 rounded-full text-sm ${
            i === 0 ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 overflow-y-auto flex flex-col gap-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
              msg.role === "ai" ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
            }`}>
              {msg.role === "ai" ? "AI" : "PK"}
            </div>
            <div className={`max-w-lg px-4 py-3 rounded-xl text-sm whitespace-pre-line ${
              msg.role === "ai"
                ? "bg-gray-800 text-gray-100"
                : "bg-blue-600 text-white"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs text-white font-bold">AI</div>
            <div className="bg-gray-800 px-4 py-3 rounded-xl text-gray-400 text-sm">Thinking...</div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          className="flex-1 bg-gray-900 border border-gray-700 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
          placeholder="Type your answer..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-medium transition-colors"
        >
          Send ↗
        </button>
      </div>
    </div>
  )
}