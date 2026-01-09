"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import UsersList from "@/components/admin/users-list"

export default function UsersPage() {
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
     <AdminLayout>
      <UsersList />
      </AdminLayout>
 
  )
}
