export default function JobsPage() {
  const jobs = [
    { company: "Microsoft India", location: "Bangalore", title: "SDE Intern — Full Stack", match: 92, tags: ["React", "Node.js", "Azure"], color: "text-green-400" },
    { company: "Google", location: "Hyderabad", title: "STEP Intern — Engineering", match: 87, tags: ["DSA", "Python", "System Design"], color: "text-green-400" },
    { company: "Zepto", location: "Mumbai (Remote)", title: "Backend Dev — New Grad", match: 74, tags: ["Node.js", "PostgreSQL", "Redis"], color: "text-yellow-400" },
    { company: "Swiggy", location: "Bangalore", title: "ML Engineer Intern", match: 70, tags: ["Python", "TensorFlow", "MLOps"], color: "text-yellow-400" },
    { company: "Razorpay", location: "Bangalore", title: "SDE-1 — Payments", match: 65, tags: ["Java", "Microservices", "Kafka"], color: "text-orange-400" },
    { company: "Flipkart", location: "Bangalore", title: "SDE Intern — Platform", match: 61, tags: ["Java", "Spring Boot", "MySQL"], color: "text-orange-400" },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">💼 Job Recommendations</h1>
        <p className="text-gray-400 mt-1">AI-matched based on your skills & resume</p>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 mb-6">
        {["All", "90%+ Match", "Internship", "Full Time", "Remote"].map((f, i) => (
          <button key={f} className={`px-3 py-1.5 rounded-full text-xs ${
            i === 0 ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div key={job.title} className="bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl p-5 cursor-pointer transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-gray-500 text-xs">{job.company} · {job.location}</p>
                <h3 className="text-white font-medium text-sm mt-1">{job.title}</h3>
              </div>
              <span className={`text-sm font-semibold ${job.color}`}>{job.match}%</span>
            </div>
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-3">
              <div className={`h-full rounded-full ${
                job.match >= 80 ? "bg-green-500" : job.match >= 65 ? "bg-yellow-500" : "bg-orange-500"
              }`} style={{ width: `${job.match}%` }} />
            </div>
            <div className="flex gap-2 flex-wrap">
              {job.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}