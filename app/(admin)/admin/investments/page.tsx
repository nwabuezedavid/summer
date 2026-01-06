"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import InvestmentsTable from "@/components/admin/investments-table"
import InvestmentModal from "@/components/admin/modals/investment-modal"

interface Investment {
  id: number
  userId: number
  planId: number
  amount: string
  profit: string
  status: string
  startedAt: string
  endsAt: string
  user?: { username: string }
  plan?: { name: string }
}

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(null)

  useEffect(() => {
    fetchInvestments()
  }, [])

  const fetchInvestments = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/investments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setInvestments(data)
      }
    } catch (error) {
      console.error("Failed to fetch investments:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingInvestment ? "PUT" : "POST"
      const url = editingInvestment ? `/api/admin/investments/${editingInvestment.id}` : "/api/admin/investments"

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
        setEditingInvestment(null)
        fetchInvestments()
      }
    } catch (error) {
      console.error("Failed to save investment:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/investments/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchInvestments()
      }
    } catch (error) {
      console.error("Failed to delete investment:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Investments</h1>
          <p className="text-slate-400 mt-1">Manage user investments</p>
        </div>
        <Button
          onClick={() => {
            setEditingInvestment(null)
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Investment
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : (
          <InvestmentsTable
            investments={investments}
            onEdit={(investment) => {
              setEditingInvestment(investment)
              setShowModal(true)
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {showModal && (
        <InvestmentModal
          investment={editingInvestment}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingInvestment(null)
          }}
        />
      )}
    </div>
  )
}
