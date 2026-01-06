"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2 } from "lucide-react"

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

interface Props {
  tickets: SupportTicket[]
  onEdit: (ticket: SupportTicket) => void
  onDelete: (id: number) => void
}

export default function TicketsTable({ tickets, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.user?.username || "N/A"}</TableCell>
            <TableCell className="font-medium">{ticket.subject}</TableCell>
            <TableCell className="max-w-xs truncate">{ticket.message}</TableCell>
            <TableCell>
              <Badge variant={ticket.status === "OPEN" ? "default" : "secondary"}>{ticket.status}</Badge>
            </TableCell>
            <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
            <TableCell className="space-x-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(ticket)} className="h-8 w-8 p-0">
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(ticket.id)}
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
