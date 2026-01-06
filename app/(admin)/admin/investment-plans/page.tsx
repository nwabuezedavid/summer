"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import InvestmentPlansTable from "@/components/admin/investment-plans-table"
import InvestmentPlanModal from "@/components/admin/modals/investment-plan-modal"

interface InvestmentPlan {
  id: number
  name: string
  description: string
  minAmount: string
  maxAmount: string
  profitPercent: string
  durationDays: number
  isActive: boolean
}

export default function InvestmentPlansPage() {
  const [plans, setPlans] = useState<InvestmentPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState<InvestmentPlan | null>(null)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/investment-plans", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setPlans(data)
      }
    } catch (error) {
      console.error("Failed to fetch plans:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingPlan ? "PUT" : "POST"
      const url = editingPlan ? `/api/admin/investment-plans/${editingPlan.id}` : "/api/admin/investment-plans"

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
        setEditingPlan(null)
        fetchPlans()
      }
    } catch (error) {
      console.error("Failed to save plan:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/investment-plans/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchPlans()
      }
    } catch (error) {
      console.error("Failed to delete plan:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Investment Plans</h1>
          <p className="text-slate-400 mt-1">Manage investment plans and packages</p>
        </div>
        <Button
          onClick={() => {
            setEditingPlan(null)
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Plan
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : (
          <InvestmentPlansTable
            plans={plans}
            onEdit={(plan) => {
              setEditingPlan(plan)
              setShowModal(true)
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {showModal && (
        <InvestmentPlanModal
          plan={editingPlan}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingPlan(null)
          }}
        />
      )}
    </div>
  )
}
