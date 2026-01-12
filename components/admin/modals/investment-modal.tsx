"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SubmitButton from "@/action/btnwe"

interface Investment {
  id?: number
  userId: number
  planId: number
  amount: string
  profit: string
  status: string
  startedAt: string
  endsAt: string
}

interface Props {
  investment: Investment | null
  onSave: (data: Investment) => void
  onClose: () => void
}

export default function InvestmentModal({ investment, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<Investment>({
    userId: 0,
    planId: 0,
    amount: "0",
    profit: "0",
    status: "RUNNING",
    startedAt: new Date().toISOString().split("T")[0],
    endsAt: new Date().toISOString().split("T")[0],
  })

  useEffect(() => {
    if (investment) {
      setFormData(investment)
    }
  }, [investment])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle>{investment ? "Edit Investment" : "Add New Investment"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="number"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: Number.parseInt(e.target.value) })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="planId">Plan ID</Label>
              <Input
                id="planId"
                type="number"
                value={formData.planId}
                onChange={(e) => setFormData({ ...formData, planId: Number.parseInt(e.target.value) })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <Label htmlFor="profit">Profit</Label>
              <Input
                id="profit"
                type="number"
                value={formData.profit}
                onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                className="bg-slate-700 border-slate-600"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RUNNING">Running</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startedAt">Started At</Label>
              <Input
                id="startedAt"
                type="date"
                value={formData.startedAt}
                onChange={(e) => setFormData({ ...formData, startedAt: e.target.value })}
                className="bg-slate-700 border-slate-600"
              />
            </div>

            <div>
              <Label htmlFor="endsAt">Ends At</Label>
              <Input
                id="endsAt"
                type="date"
                value={formData.endsAt}
                onChange={(e) => setFormData({ ...formData, endsAt: e.target.value })}
                className="bg-slate-700 border-slate-600"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
             <SubmitButton />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
