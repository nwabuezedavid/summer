"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
 
import BonusesTable from "@/components/admin/wallettable"
import BonusModal from "@/components/admin/modals/walletb"
 
 
  

export default function BonusesPage() {
  const [bonuses, setBonuses] = useState ([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBonus, setEditingBonus] = useState (null)
 
   

 
  useEffect(() => {
    fetchBonuses()
  }, [])

  const fetchBonuses = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/wallet", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setBonuses(data)
      }
    } catch (error) {
      console.error("Failed to fetch bonuses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data) => {
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingBonus ? "PUT" : "POST"
      const url = editingBonus ? `/api/admin/wallet/${editingBonus.id}` : "/api/admin/wallet"

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
        setEditingBonus(null)
        fetchBonuses()
      }
    } catch (error) {
      console.error("Failed to save bonus:", error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/wallet/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchBonuses()
      }
    } catch (error) {
      console.error("Failed to delete bonus:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">wallet</h1>
          <p className="text-slate-400 mt-1">Manage wallet</p>
        </div>
        <Button
          onClick={() => {
            setEditingBonus(null)
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add wallet
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : (
          <BonusesTable
            bonuses={bonuses}
            onEdit={(bonus) => {
              setEditingBonus(bonus)
              setShowModal(true)
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {showModal && (
        <BonusModal
          bonus={editingBonus}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingBonus(null)
          }}
        />
      )}
    </div>
  )
}
