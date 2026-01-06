"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

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

interface Props {
  investments: Investment[]
  onEdit: (investment: Investment) => void
  onDelete: (id: number) => void
}

export default function InvestmentsTable({ investments, onEdit, onDelete }: Props) {
  console.log(investments);
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Profit</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Started</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {investments.map((investment) => (
          <TableRow key={investment.id}>
            <TableCell>{investment.user?.username || "N/A"}</TableCell>
            <TableCell>{investment.plan?.name || "N/A"}</TableCell>
            <TableCell>${investment.amount}</TableCell>
            <TableCell>${investment.profit}</TableCell>
            <TableCell>
              <Badge variant={investment.status === "RUNNING" ? "default" : "secondary"}>{investment.status}</Badge>
            </TableCell>
            <TableCell>{new Date(investment.startedAt).toLocaleDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(investment)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(investment.id)}
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
