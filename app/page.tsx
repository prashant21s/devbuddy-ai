export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-blue-400">DevBuddy AI</h1>
        <p className="text-gray-400 mt-4 text-xl">
          Your AI-powered placement companion
        </p>
        <div className="mt-8 bg-gray-800 rounded-xl p-6 text-left max-w-md">
          <p className="text-green-400 font-mono text-sm">✓ Environment Setup Complete</p>
          <p className="text-gray-500 font-mono text-sm mt-2">→ Next: Building the Dashboard</p>
        </div>
      </div>
    </main>
  )
}