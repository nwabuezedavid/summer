"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2 } from "lucide-react"
import UserFormModal from "./modals/user-form-modal"
import DeleteConfirmModal from "./modals/delete-confirm-modal"

interface User {
  id: string
  email: string
  username: string
  mainBalance: number
  profitBalance: number
  password: string
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (err) {
      console.log("[v0] Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id))
        setDeleteId(null)
      }
    } catch (err) {
      console.log("[v0] Error deleting user:", err)
    }
  }

  if (loading) {
    return <div className="text-slate-400">Loading users...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Users Management</h1>
        <Button
          onClick={() => {
            setEditingUser(null)
            setShowForm(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add User
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-6 py-3 text-left text-white font-semibold">id</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Email</th>
                <th className="px-6 py-3 text-left text-white font-semibold">password</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Username</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Balance</th>
                <th className="px-6 py-3 text-left text-white font-semibold">profitBalance</th>
                <th className="px-6 py-3 text-left text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700">
                  <td className="px-6 py-3 text-slate-300">{user.id}</td>
                  <td className="px-6 py-3 text-slate-300">{user.email}</td>
                  <td className="px-6 py-3 text-slate-300">{user.password}</td>
                  <td className="px-6 py-3 text-slate-300">{user.username}</td>
                  <td className="px-6 py-3 text-slate-300">${user.mainBalance}</td>
                  <td className="px-6 py-3 text-slate-300">${user.profitBalance}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingUser(user)
                          setShowForm(true)
                        }}
                        className="p-2 text-blue-400 hover:bg-slate-600 rounded"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteId(user.id)}
                        className="p-2 text-red-400 hover:bg-slate-600 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {showForm && (
        <UserFormModal
          user={editingUser}
          onClose={() => {
            setShowForm(false)
            setEditingUser(null)
          }}
          onSuccess={() => {
            fetchUsers()
            setShowForm(false)
            setEditingUser(null)
          }}
        />
      )}

      {deleteId && <DeleteConfirmModal onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
