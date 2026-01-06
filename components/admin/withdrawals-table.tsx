"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

interface Withdrawal {
  id: number
  userId: number
  amount: string
  crypto: string
  wallet: string
  status: string
  createdAt: string
  user?: { username: string }
}

interface Props {
  withdrawals: Withdrawal[]
  onEdit: (withdrawal: Withdrawal) => void
  onDelete: (id: number) => void
}

export default function WithdrawalsTable({ withdrawals, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Crypto</TableHead>
          <TableHead>Wallet</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {withdrawals.map((withdrawal) => (
          <TableRow key={withdrawal.id}>
            <TableCell>{withdrawal.user?.username || "N/A"}</TableCell>
            <TableCell>${withdrawal.amount}</TableCell>
            <TableCell>{withdrawal.crypto}</TableCell>
            <TableCell className="font-mono text-xs">{withdrawal.wallet.substring(0, 16)}...</TableCell>
            <TableCell>
              <Badge
                variant={
                  withdrawal.status === "APPROVED"
                    ? "default"
                    : withdrawal.status === "REJECTED"
                      ? "destructive"
                      : "secondary"
                }
              >
                {withdrawal.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(withdrawal.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(withdrawal)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(withdrawal.id)}
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
