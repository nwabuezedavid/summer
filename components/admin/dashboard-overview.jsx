"use client"

import { useEffect, useState } from "react"
import { Card } from "../ui/card"
 

 

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    totalInvestments: 0,
    totalWithdrawals: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("adminToken")
        const res = await fetch("/api/admin/stats", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (res.ok) {
          const data = await res.json()
          setStats(data)
        }
      } catch (err) {
        console.log("[v0] Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return <div className="text-slate-400">Loading dashboard...</div>
  }

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, color: "from-blue-600 to-blue-800" },
    { label: "Total Deposits", value: `$${stats.totalDeposits}`, color: "from-green-600 to-green-800" },
    { label: "Total Investments", value: `$${stats.totalInvestments}`, color: "from-purple-600 to-purple-800" },
    { label: "Total Withdrawals", value: `$${stats.totalWithdrawals}`, color: "from-orange-600 to-orange-800" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} border-0 p-6 text-white`}>
            <p className="text-slate-200 text-sm font-medium mb-2">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-8 bg-slate-800 border-slate-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
        <p className="text-slate-400">
          Navigate through the menu to manage users, investments, deposits, withdrawals, bonuses, and support tickets.
        </p>
      </Card>
    </div>
  )
}
