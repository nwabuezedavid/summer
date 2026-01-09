"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import DepositsTable from "@/components/admin/deposits-table"
import DepositModal from "@/components/admin/modals/deposit-modal"
import AdminLayout from "@/components/admin/admin-layout"

interface Deposit {
  id: number
  userId: number
  amount: string
  crypto: string
  txHash: string
  proof: string
  status: string
  createdAt: string
  user?: { username: string }
}

export default function DepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingDeposit, setEditingDeposit] = useState<Deposit | null>(null)

  useEffect(() => {
    fetchDeposits()
  }, [])

  const fetchDeposits = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/deposits", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setDeposits(data)
      }
    } catch (error) {
      console.error("Failed to fetch deposits:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingDeposit ? "PUT" : "POST"
      const url = editingDeposit ? `/api/admin/deposits/${editingDeposit.id}` : "/api/admin/deposits"

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
        setEditingDeposit(null)
        fetchDeposits()
      }
    } catch (error) {
      console.error("Failed to save deposit:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/deposits/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchDeposits()
      }
    } catch (error) {
      console.error("Failed to delete deposit:", error)
    }
  }

  return (

    <AdminLayout>
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Deposits</h1>
          <p className="text-slate-400 mt-1">Manage user deposits and payments</p>
        </div>
        <Button
          onClick={() => {
            setEditingDeposit(null)
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Deposit
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : (
          <DepositsTable
            deposits={deposits}
            onEdit={(deposit) => {
              setEditingDeposit(deposit)
              setShowModal(true)
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {showModal && (
        <DepositModal
          deposit={editingDeposit}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingDeposit(null)
          }}
        />
      )}
    </div>
    </AdminLayout>
  )
}
