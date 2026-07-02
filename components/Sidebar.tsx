"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/dashboard", icon: "DB", label: "Dashboard" },
  { href: "/dashboard/skills", icon: "SK", label: "Skills Gap" },
  { href: "/dashboard/roadmap", icon: "RM", label: "Roadmap" },
  { href: "/dashboard/interview", icon: "AI", label: "Mock Interview" },
  { href: "/dashboard/jobs", icon: "JB", label: "Job Match" },
  { href: "/dashboard/profile", icon: "PF", label: "My Profile" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden min-h-screen w-60 flex-col border-r border-slate-800 bg-slate-950 md:flex">
      <div className="border-b border-slate-800 p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400 text-sm font-bold text-slate-950">
            D
          </div>
          <span className="text-sm font-semibold text-white">PlacementBuddy</span>
        </Link>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-cyan-400 font-medium text-slate-950"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <span className="w-6 text-[10px] font-semibold">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
            PK
          </div>
          <div>
            <p className="text-xs font-medium text-white">Prashant</p>
            <p className="text-xs text-slate-500">B.Tech CSE - Final year</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
