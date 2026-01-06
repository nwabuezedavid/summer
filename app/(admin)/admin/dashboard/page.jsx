"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import DashboardOverview from "@/components/admin/dashboard-overview"
import AdminLayout from "@/components/admin/admin-layout"
 

 
 
 
export default function AdminDashboard() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }
    setAuthenticated(true)
  }, [router])

  if (!authenticated) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
   
      <DashboardOverview />
   
  )
}
