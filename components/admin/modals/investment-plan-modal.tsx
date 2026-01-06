"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface InvestmentPlan {
  id?: number
  name: string
  description: string
  minAmount: string
  maxAmount: string
  profitPercent: string
  durationDays: number
  isActive: boolean
}

interface Props {
  plan: InvestmentPlan | null
  onSave: (data: InvestmentPlan) => void
  onClose: () => void
}

export default function InvestmentPlanModal({ plan, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<InvestmentPlan>({
    name: "",
    description: "",
    minAmount: "0",
    maxAmount: "0",
    profitPercent: "0",
    durationDays: 0,
    isActive: true,
  })

  useEffect(() => {
    if (plan) {
      setFormData(plan)
    }
  }, [plan])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle>{plan ? "Edit Plan" : "Add New Plan"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Plan Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-slate-700 border-slate-600"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-slate-700 border-slate-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minAmount">Min Amount</Label>
              <Input
                id="minAmount"
                type="number"
                value={formData.minAmount}
                onChange={(e) => setFormData({ ...formData, minAmount: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="maxAmount">Max Amount</Label>
              <Input
                id="maxAmount"
                type="number"
                value={formData.maxAmount}
                onChange={(e) => setFormData({ ...formData, maxAmount: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="profitPercent">Profit %</Label>
              <Input
                id="profitPercent"
                type="number"
                step="0.1"
                value={formData.profitPercent}
                onChange={(e) => setFormData({ ...formData, profitPercent: e.target.value })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>

            <div>
              <Label htmlFor="durationDays">Duration (Days)</Label>
              <Input
                id="durationDays"
                type="number"
                value={formData.durationDays}
                onChange={(e) => setFormData({ ...formData, durationDays: Number.parseInt(e.target.value) })}
                className="bg-slate-700 border-slate-600"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
            />
            <Label htmlFor="isActive">Active</Label>
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {plan ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
