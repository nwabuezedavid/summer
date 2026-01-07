"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import TransfersTable from "@/components/admin/transfers-table"
import TransferModal from "@/components/admin/modals/transfer-modal"

interface AdminTransfer {
  id: number
  userId: number
  amount: string
  email: string
  statue : string 
  status ?: string 
  createdAt: string
  user?: { username: string }
}

export default function TransfersPage() {
  const [transfers, setTransfers] = useState<AdminTransfer[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTransfer, setEditingTransfer] = useState<AdminTransfer | null>(null)

  useEffect(() => {
    fetchTransfers()
  }, [])

  const fetchTransfers = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/transfers", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setTransfers(data)
      }
    } catch (error) {
      console.error("Failed to fetch transfers:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingTransfer ? "PUT" : "POST"
      const url = editingTransfer ? `/api/admin/transfers/${editingTransfer.id}` : "/api/admin/transfers"

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
        setEditingTransfer(null)
        fetchTransfers()
      }
    } catch (error) {
      console.error("Failed to save transfer:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/transfers/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchTransfers()
      }
    } catch (error) {
      console.error("Failed to delete transfer:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Transfers</h1>
          <p className="text-slate-400 mt-1">Manage user transfers</p>
        </div>
        <Button
          onClick={() => {
            setEditingTransfer(null)
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Transfer
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : (
          <TransfersTable
            transfers={transfers}
            onEdit={(transfer) => {
              setEditingTransfer(transfer)
              setShowModal(true)
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {showModal && (
        <TransferModal
          transfer={editingTransfer}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingTransfer(null)
          }}
        />
      )}
    </div>
  )
}
