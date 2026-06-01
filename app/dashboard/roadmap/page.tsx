export default function RoadmapPage() {
  const weeks = [
    { week: "Week 1–2", title: "Arrays & Strings DSA", desc: "30 LeetCode easy/medium problems", status: "done", tag: "Completed" },
    { week: "Week 3–4", title: "React + REST API Project", desc: "Built full-stack CRUD app, deployed on Vercel", status: "done", tag: "Completed" },
    { week: "Week 5–6", title: "System Design Basics", desc: "Load balancing, caching, DB sharding — critical weak area", status: "active", tag: "In Progress" },
    { week: "Week 7–8", title: "OS & DBMS Revision", desc: "Process scheduling, transactions, indexing", status: "todo", tag: "Upcoming" },
    { week: "Week 9–10", title: "Mock Interviews + Resume Polish", desc: "5 AI mock interviews, 2 resume revisions", status: "todo", tag: "Upcoming" },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">🗺️ Personalized Roadmap</h1>
        <p className="text-gray-400 mt-1">AI-generated based on your profile gaps</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400 text-sm">Overall Progress</span>
          <span className="text-white text-sm font-medium">40% Complete</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }} />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-gray-500 text-xs">2 of 5 phases done</span>
          <span className="text-gray-500 text-xs">~4 weeks remaining</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="flex flex-col">
        {weeks.map((item, i) => (
          <div key={i} className="flex gap-4 pb-6 relative">
            {/* Line */}
            {i < weeks.length - 1 && (
              <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-800" />
            )}
            {/* Dot */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold z-10 ${
              item.status === "done" ? "bg-green-600 text-white" :
              item.status === "active" ? "bg-blue-600 text-white" :
              "bg-gray-800 text-gray-500"
            }`}>
              {item.status === "done" ? "✓" : item.status === "active" ? "▶" : "○"}
            </div>
            {/* Content */}
            <div className={`flex-1 bg-gray-900 border rounded-xl p-4 ${
              item.status === "active" ? "border-blue-600" : "border-gray-800"
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-500 text-xs">{item.week}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.status === "done" ? "bg-green-900 text-green-400" :
                  item.status === "active" ? "bg-blue-900 text-blue-400" :
                  "bg-gray-800 text-gray-500"
                }`}>{item.tag}</span>
              </div>
              <h3 className="text-white font-medium text-sm">{item.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}