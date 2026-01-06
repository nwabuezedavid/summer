"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

interface Transfer {
  id: number
  userId: number
  amount: string
  email: string
  statue: string
  createdAt: string
  user?: { username: string }
}

interface Props {
  transfers: Transfer[]
  onEdit: (transfer: Transfer) => void
  onDelete: (id: number) => void
}

export default function TransfersTable({ transfers, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transfers.map((transfer) => (
          <TableRow key={transfer.id}>
            <TableCell>{transfer.user?.username || "N/A"}</TableCell>
            <TableCell>${transfer.amount}</TableCell>
            <TableCell>{transfer.email}</TableCell>
            <TableCell>
              <Badge
                variant={
                  transfer.statue === "APPROVED"
                    ? "default"
                    : transfer.statue === "REJECTED"
                      ? "destructive"
                      : "secondary"
                }
              >
                {transfer.statue}
              </Badge>
            </TableCell>
            <TableCell>{new Date(transfer.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(transfer)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(transfer.id)}
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
