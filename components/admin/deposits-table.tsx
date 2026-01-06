"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

interface Deposit {
  id: number
  userId: number
  amount: string
  crypto: string
  txHash: string
  proof: string
  status: string
  createdAt: string
  user?: { username: string }
}

interface Props {
  deposits: Deposit[]
  onEdit: (deposit: Deposit) => void
  onDelete: (id: number) => void
}

export default function DepositsTable({ deposits, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Crypto</TableHead>
          <TableHead>TX Hash</TableHead>
          <TableHead>Status</TableHead>

          <TableHead>proof</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deposits.map((deposit) => (
          <TableRow key={deposit.id}>
            <TableCell>{deposit.user?.username || "N/A"}</TableCell>
            <TableCell>${deposit.amount}</TableCell>
            <TableCell>{deposit.crypto}</TableCell>
            {deposit.proof ? <a href={deposit.proof} className="text-red-400 p-3 items-center flex">proof images</a>:'none image'}
            
            <TableCell className="font-mono text-xs">{deposit.txHash?.substring(0, 16)}...</TableCell>
            <TableCell>
              <Badge
                variant={
                  deposit.status === "APPROVED"
                    ? "default"
                    : deposit.status === "REJECTED"
                      ? "destructive"
                      : "secondary"
                }
              >
                {deposit.status}
              </Badge>
            </TableCell>
            <TableCell>{new Date(deposit.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(deposit)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(deposit.id)}
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
