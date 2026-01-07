"use client"
 
import { useState } from "react"
import { useRouter } from "next/navigation"
 
 
 
 
 

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@example.com")
  const [password, setPassword] = useState("admin123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e ) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
        
      localStorage.setItem("adminToken", data.token)
      router.push("/admin/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md p-8 bg-slate-800 border-slate-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-slate-400">Investment Platform Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-700 w-full p-2 rounded-md  border-slate-600 text-white placeholder:text-slate-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-700 border-slate-600 w-full p-2 rounded-md  text-white placeholder:text-slate-500"
              placeholder="••••••••"
            />
          </div>

          {error && <div className="p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">{error}</div>}

          <button type="submit" disabled={loading} className="w-full w-full p-2 rounded-full  bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-xs text-slate-400 text-center mt-4">Demo credentials: admin@example.com / admin123</p>
        </form>
      </div>
    </div>
  )
}
