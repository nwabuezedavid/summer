"use client"



import { useState } from "react"
import { logoutActionadmin } from "@/action/authaction"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const menuItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "wallet", href: "/admin/wallet" },
  { label: "Investment Plans", href: "/admin/investment-plans" },
  { label: "Investments", href: "/admin/investments" },
  { label: "Deposits", href: "/admin/deposits" },
  { label: "Withdrawals", href: "/admin/withdrawals" },
  { label: "Transfers", href: "/admin/transfers" },
  { label: "Bonuses", href: "/admin/bonuses" },
  { label: "Support Tickets", href: "/admin/support-tickets" },
]

export default function AdminLayout({ children } ) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    logoutActionadmin()
    router.push("/admin/login") 
  }

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-slate-800 border-r border-slate-700 overflow-hidden transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <Button onClick={handleLogout} className="w-full bg-red-600 hover:bg-red-700">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h2 className="text-xl font-semibold text-white">Admin Panel</h2>
          <div className="w-6" />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </div>
  )
}
