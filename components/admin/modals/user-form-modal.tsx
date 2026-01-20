"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface User {
  id: string
  email: string
  username: string
  password: string
  mainBalance: number
  profitBalance: number
}

interface Props {
  user?: User | null
  onClose: () => void
  onSuccess: () => void
}

export default function UserFormModal({ user, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
    balance: user?.mainBalance || 0,
    pbalance: user?.profitBalance || 0,
    password: user?.password,
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem("adminToken")
      const method = user ? "PUT" : "POST"
      const url = user ? `/api/admin/users/${user.id}` : "/api/admin/users"

      const payload = { ...formData }
      if (!user) {
        if (!payload.password) throw new Error("Password required for new users")
      } else {
        if (!payload.password) delete payload.password
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        onSuccess()
      } else {
        const err = await res.json()
        throw new Error(err.message)
      }
    } catch (err) {
      console.log("[v0] Error saving user:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-slate-800 border-slate-700 p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4">{user ? "Edit User" : "Add New User"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Username</label>
            <Input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Balance</label>
            <Input
              type="number"
              value={formData.balance}
              onChange={(e) => setFormData({ ...formData, balance: Number(e.target.value) })}
              className="bg-slate-700 border-slate-600 text-white"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">profit Balance</label>
            <Input
              type="number"
              value={formData.pbalance}
              onChange={(e) => setFormData({ ...formData, pbalance: Number(e.target.value) })}
              className="bg-slate-700 border-slate-600 text-white"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password {user && "(leave blank to keep current)"}
            </label>
            <Input
              type="text"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="bg-slate-700 border-slate-600 text-white"
              required={!user}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" onClick={onClose} className="flex-1 bg-slate-600 hover:bg-slate-700">
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
