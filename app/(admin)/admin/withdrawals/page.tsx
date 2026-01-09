"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import WithdrawalsTable from "@/components/admin/withdrawals-table"
import WithdrawalModal from "@/components/admin/modals/withdrawal-modal"
import AdminLayout from "@/components/admin/admin-layout"

interface Withdrawal {
  id: number
  userId: number
  amount: string
  crypto: string
  wallet: string
  status: string
  createdAt: string
  user?: { username: string }
}

export default function WithdrawalsPage() {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingWithdrawal, setEditingWithdrawal] = useState<Withdrawal | null>(null)

  useEffect(() => {
    fetchWithdrawals()
  }, [])

  const fetchWithdrawals = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/withdrawals", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setWithdrawals(data)
      }
    } catch (error) {
      console.error("Failed to fetch withdrawals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingWithdrawal ? "PUT" : "POST"
      const url = editingWithdrawal ? `/api/admin/withdrawals/${editingWithdrawal.id}` : "/api/admin/withdrawals"

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setShowModal(false)
        setEditingWithdrawal(null)
        fetchWithdrawals()
      }
    } catch (error) {
      console.error("Failed to save withdrawal:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/withdrawals/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchWithdrawals()
      }
    } catch (error) {
      console.error("Failed to delete withdrawal:", error)
    }
  }

  return (

       <AdminLayout>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Withdrawals</h1>
          <p className="text-slate-400 mt-1">Manage user withdrawals</p>
        </div>
        <Button
          onClick={() => {
            setEditingWithdrawal(null)
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Withdrawal
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : (
          <WithdrawalsTable
            withdrawals={withdrawals}
            onEdit={(withdrawal) => {
              setEditingWithdrawal(withdrawal)
              setShowModal(true)
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {showModal && (
        <WithdrawalModal
          withdrawal={editingWithdrawal}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingWithdrawal(null)
          }}
        />
      )}
    </div></AdminLayout>
  )
}
