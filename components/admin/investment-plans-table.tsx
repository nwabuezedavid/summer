"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

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

interface Props {
  plans: InvestmentPlan[]
  onEdit: (plan: InvestmentPlan) => void
  onDelete: (id: number) => void
}

export default function InvestmentPlansTable({ plans, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Min Amount</TableHead>
          <TableHead>Max Amount</TableHead>
          <TableHead>Profit %</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {plans.map((plan) => (
          <TableRow key={plan.id}>
            <TableCell className="font-medium">{plan.name}</TableCell>
            <TableCell>${plan.minAmount}</TableCell>
            <TableCell>${plan.maxAmount}</TableCell>
            <TableCell>{plan.profitPercent}%</TableCell>
            <TableCell>{plan.durationDays} days</TableCell>
            <TableCell>
              <Badge variant={plan.isActive ? "default" : "secondary"}>{plan.isActive ? "Active" : "Inactive"}</Badge>
            </TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(plan)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(plan.id)}
                className="h-8 w-8 p-0 text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
