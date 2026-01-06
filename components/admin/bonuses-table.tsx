"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

interface Bonus {
  id: number
  userId: number
  amount: string
  type: string
  note: string
  createdAt: string
  user?: { username: string }
}

interface Props {
  bonuses: Bonus[]
  onEdit: (bonus: Bonus) => void
  onDelete: (id: number) => void
}

export default function BonusesTable({ bonuses, onEdit, onDelete }: Props) {
  console.log(bonuses)
              
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bonuses.map((bonus) => (
          <TableRow key={bonus.id}>
            <TableCell>{bonus.user?.username || "N/A"}</TableCell>
            <TableCell>${bonus.amount}</TableCell>
            <TableCell>
              <Badge>{bonus.type}</Badge>
            </TableCell>
            <TableCell>{bonus.note}</TableCell>
            <TableCell>{new Date(bonus.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(bonus)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(bonus.id)}
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
