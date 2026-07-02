import Sidebar from "@/components/Sidebar"
import Link from "next/link"

const mobileItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/skills", label: "Skills" },
  { href: "/dashboard/interview", label: "Interview" },
  { href: "/dashboard/jobs", label: "Jobs" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <nav className="mb-6 flex gap-2 overflow-x-auto md:hidden">
          {mobileItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </main>
    </div>
  )
}
