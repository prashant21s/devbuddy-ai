export default function SkillsPage() {
  const skills = [
    { name: "Data Structures & Algorithms", pct: 80, level: "Good", color: "bg-green-500", topics: ["Arrays", "Trees", "Graphs", "DP"] },
    { name: "Web Development", pct: 78, level: "Good", color: "bg-green-500", topics: ["React", "Node.js", "REST APIs", "CSS"] },
    { name: "Machine Learning / AI", pct: 71, level: "Good", color: "bg-blue-500", topics: ["Python", "sklearn", "Neural Nets"] },
    { name: "SQL & Databases", pct: 55, level: "Average", color: "bg-blue-400", topics: ["Joins", "Indexing", "Transactions"] },
    { name: "OS Concepts", pct: 42, level: "Weak", color: "bg-orange-500", topics: ["Scheduling", "Memory", "Deadlocks"] },
    { name: "DevOps / CI-CD", pct: 35, level: "Weak", color: "bg-orange-400", topics: ["Docker", "GitHub Actions", "Linux"] },
    { name: "System Design", pct: 28, level: "Critical", color: "bg-red-500", topics: ["Load Balancing", "Caching", "Sharding"] },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">🎯 Skills Gap Analysis</h1>
        <p className="text-gray-400 mt-1">Compared against top company requirements</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-6">
        {[
          { label: "Critical (0-30%)", color: "bg-red-500" },
          { label: "Weak (31-45%)", color: "bg-orange-500" },
          { label: "Average (46-65%)", color: "bg-blue-400" },
          { label: "Good (66%+)", color: "bg-green-500" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${l.color}`} />
            <span className="text-gray-400 text-xs">{l.label}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="flex flex-col gap-4">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-white font-medium text-sm">{skill.name}</h3>
                <div className="flex gap-2 mt-1">
                  {skill.topics.map((t) => (
                    <span key={t} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-white font-semibold text-lg">{skill.pct}%</span>
                <p className={`text-xs mt-0.5 ${
                  skill.level === "Critical" ? "text-red-400" :
                  skill.level === "Weak" ? "text-orange-400" :
                  skill.level === "Average" ? "text-blue-400" : "text-green-400"
                }`}>{skill.level}</p>
              </div>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className={`h-full ${skill.color} rounded-full transition-all`} style={{ width: `${skill.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}