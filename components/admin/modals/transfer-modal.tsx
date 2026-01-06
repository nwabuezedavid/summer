"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAlluser } from "../action"

interface Transfer {
  id?: number
  userId: number
  amount: string
  email: string
  status: string
}

interface Props {
  transfer: Transfer | null
  onSave: (data: Transfer) => void
  onClose: () => void
}

export default function TransferModal({ transfer, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<Transfer>({
    userId: 0,
    amount: "0",
    email: "",
    statue: "PENDING",
  })
const [allusers, setallusers] = useState([])
  useEffect(() => {
    if (transfer) {
      setFormData(transfer)
    }

    getAlluser().then(e=>setallusers(e))
  }, [transfer])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle>{transfer ? "Edit Transfer" : "Add New Transfer"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userId">User ID</Label>
              {transfer?
              <Input
                id="userId"
                type="number"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: Number.parseInt(e.target.value) })}
                className="bg-slate-700 border-slate-600"
                required
              /> :
              <select  className="bg-slate-700 border-slate-600" name="userId" id="userId" onChange={(e) => setFormData({ ...formData, userId: Number.parseInt(e.target.value) })}>
                <option value="">select user</option>
                {allusers.map(ex=> <option value={ex.id}>{ex.username}</option>)}
                
              </select>
              }
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-slate-700 border-slate-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.statue} onValueChange={(value) => setFormData({ ...formData, statue: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {transfer ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
