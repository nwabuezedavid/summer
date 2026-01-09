"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import TicketsTable from "@/components/admin/tickets-table"
import TicketModal from "@/components/admin/modals/ticket-modal"
import AdminLayout from "@/components/admin/admin-layout"

interface SupportTicket {
  id: number
  userId: number
  subject: string
  message: string
  status: string
  image: string
  createdAt: string
  user?: { username: string }
}

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTicket, setEditingTicket] = useState<SupportTicket | null>(null)

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch("/api/admin/support-tickets", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        setTickets(data)
      }
    } catch (error) {
      console.error("Failed to fetch tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (data: any) => {
    try {
      const token = localStorage.getItem("adminToken")
      const method = editingTicket ? "PUT" : "POST"
      const url = editingTicket ? `/api/admin/support-tickets/${editingTicket.id}` : "/api/admin/support-tickets"

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
        setEditingTicket(null)
        fetchTickets()
      }
    } catch (error) {
      console.error("Failed to save ticket:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("adminToken")
      const res = await fetch(`/api/admin/support-tickets/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (res.ok) {
        fetchTickets()
      }
    } catch (error) {
      console.error("Failed to delete ticket:", error)
    }
  }

  return (
   <AdminLayout>

    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Support Tickets</h1>
          <p className="text-slate-400 mt-1">Manage customer support requests</p>
        </div>
        <Button
          onClick={() => {
            setEditingTicket(null)
            setShowModal(true)
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Ticket
        </Button>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading...</div>
        ) : (
          <TicketsTable
            tickets={tickets}
            onEdit={(ticket) => {
              setEditingTicket(ticket)
              setShowModal(true)
            }}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {showModal && (
        <TicketModal
          ticket={editingTicket}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false)
            setEditingTicket(null)
          }}
        />
      )}
    </div>
    </AdminLayout>
  )
}
