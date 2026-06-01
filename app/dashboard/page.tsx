export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Welcome back, Prashant 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Your placement readiness updated today
        </p>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-xs mb-2">🏆 Placement Score</p>
          <p className="text-3xl font-semibold text-white">73<span className="text-gray-500 text-lg">/100</span></p>
          <p className="text-green-400 text-xs mt-2">↑ +5 this week</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-xs mb-2">🐙 GitHub Score</p>
          <p className="text-3xl font-semibold text-white">62<span className="text-gray-500 text-lg">/100</span></p>
          <p className="text-red-400 text-xs mt-2">↓ 3 repos inactive</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-xs mb-2">💻 LeetCode</p>
          <p className="text-3xl font-semibold text-white">148<span className="text-gray-500 text-lg"> solved</span></p>
          <p className="text-green-400 text-xs mt-2">↑ +12 this month</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-xs mb-2">📄 Resume Score</p>
          <p className="text-3xl font-semibold text-white">81<span className="text-gray-500 text-lg">/100</span></p>
          <p className="text-blue-400 text-xs mt-2">ATS optimized</p>
        </div>
      </div>

      {/* Weak Skills */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-medium mb-4">🎯 Weak Areas to Fix</h2>
          <div className="flex flex-col gap-3">
            {[
              { name: "System Design", pct: 28, color: "bg-red-500" },
              { name: "DevOps / CI-CD", pct: 35, color: "bg-orange-500" },
              { name: "OS Concepts",   pct: 42, color: "bg-orange-400" },
              { name: "SQL / DBs",     pct: 55, color: "bg-blue-500" },
              { name: "Web Dev",       pct: 78, color: "bg-green-500" },
              { name: "ML / AI",       pct: 71, color: "bg-green-400" },
            ].map((skill) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="text-gray-400 text-xs w-28">{skill.name}</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${skill.color} rounded-full`}
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
                <span className="text-gray-500 text-xs w-8 text-right">{skill.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white font-medium mb-4">⚡ Quick Actions</h2>
          <div className="flex flex-col gap-3">
            {[
              { label: "Start Mock Interview", desc: "Practice DSA questions", color: "bg-blue-600 hover:bg-blue-700" },
              { label: "View My Roadmap",      desc: "Week 5-6: System Design", color: "bg-purple-600 hover:bg-purple-700" },
              { label: "Browse Job Matches",   desc: "4 new matches today", color: "bg-green-600 hover:bg-green-700" },
              { label: "Upload Resume",        desc: "Get AI feedback", color: "bg-orange-600 hover:bg-orange-700" },
            ].map((action) => (
              <button
                key={action.label}
                className={`${action.color} text-white rounded-lg px-4 py-3 text-left transition-colors`}
              >
                <p className="text-sm font-medium">{action.label}</p>
                <p className="text-xs opacity-75 mt-0.5">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}