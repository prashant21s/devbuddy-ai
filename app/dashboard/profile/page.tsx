export default function ProfilePage() {
  const sources = [
    { icon: "📄", title: "Resume", desc: "Prashant_Resume_2025.pdf · Last analyzed today", status: "Connected", statusColor: "text-green-400 bg-green-900" },
    { icon: "🐙", title: "GitHub", desc: "github.com/prashant21s · 18 repos · Last synced 2h ago", status: "Connected", statusColor: "text-green-400 bg-green-900" },
    { icon: "💻", title: "LeetCode", desc: "148 solved · Top 22% · Easy: 62, Medium: 79, Hard: 7", status: "Connected", statusColor: "text-green-400 bg-green-900" },
    { icon: "🌐", title: "Portfolio Website", desc: "Not connected yet — add your portfolio URL", status: "Pending", statusColor: "text-yellow-400 bg-yellow-900" },
  ]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">👤 My Profile</h1>
        <p className="text-gray-400 mt-1">Manage your connected data sources</p>
      </div>

      {/* User Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
          PK
        </div>
        <div>
          <h2 className="text-white font-semibold text-lg">Prashant Kumar</h2>
          <p className="text-gray-400 text-sm">B.Tech Computer Science · Year 4</p>
          <p className="text-gray-500 text-xs mt-1">Member since June 2025</p>
        </div>
        <div className="ml-auto">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-400">73</p>
            <p className="text-gray-500 text-xs">Placement Score</p>
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <h2 className="text-white font-medium mb-3">Connected Data Sources</h2>
      <div className="flex flex-col gap-3">
        {sources.map((src) => (
          <div key={src.title} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
            <span className="text-2xl">{src.icon}</span>
            <div className="flex-1">
              <h3 className="text-white text-sm font-medium">{src.title}</h3>
              <p className="text-gray-500 text-xs mt-0.5">{src.desc}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full ${src.statusColor}`}>
              {src.status}
            </span>
          </div>
        ))}
      </div>

      {/* Add Portfolio */}
      <div className="mt-6 bg-gray-900 border border-dashed border-gray-700 rounded-xl p-5">
        <p className="text-gray-400 text-sm mb-3">🌐 Add Portfolio URL</p>
        <div className="flex gap-3">
          <input
            className="flex-1 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
            placeholder="https://yourportfolio.dev"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
            Connect
          </button>
        </div>
      </div>
    </div>
  )
}