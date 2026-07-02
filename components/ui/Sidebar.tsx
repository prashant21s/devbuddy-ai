"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/dashboard", icon: "📊", label: "Dashboard" },
  { href: "/dashboard/skills", icon: "🎯", label: "Skills Gap" },
  { href: "/dashboard/roadmap", icon: "🗺️", label: "Roadmap" },
  { href: "/dashboard/interview", icon: "🤖", label: "Mock Interview" },
  { href: "/dashboard/jobs", icon: "💼", label: "Job Match" },
  { href: "/dashboard/profile", icon: "👤", label: "My Profile" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <span className="text-white font-semibold text-sm">PlacementBuddy</span>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-blue-600 text-white font-medium"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom user section */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            PK
          </div>
          <div>
            <p className="text-white text-xs font-medium">Prashant</p>
            <p className="text-gray-500 text-xs">B.Tech CSE · Year 4</p>
          </div>
        </div>
      </div>
    </aside>
  )
}