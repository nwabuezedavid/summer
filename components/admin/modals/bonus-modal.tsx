"use client"
 import {getOneuser,getAlluser} from "@/components/admin/action"; 

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Bonus {
  id?: number
  userId: number
  amount: string
  type: string
  note: string
}

interface Props {
  bonus: Bonus | null
  onSave: (data: Bonus) => void
  onClose: () => void
}

export default function BonusModal({ bonus, onSave, onClose }: Props) {
  const [formData, setFormData] = useState<Bonus>({
    userId: 0,
    amount: "0",
    type: "REFERRAL",
    note: "",
  })
const [alluser, setalluser] = useState([])
const [singleuser, setsingleuser] = useState()
  useEffect(() => {
    if (bonus) {
      setFormData(bonus)
    }
getAlluser().then(setalluser)
if (formData.userId) {
    getOneuser(formData.userId).then(setsingleuser)
  }
console.log(alluser);

  }, [bonus])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle>{bonus ? "Edit Bonus" : "Add New Bonus"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="userId">User ID</Label>
               

              <select className="bg-slate-700 border-slate-600"
                required name="userId" id="userId" onChange={(e) => setFormData({ ...formData, userId: Number.parseInt(e.target.value) })}>
                <option value={formData.userId}> </option>
{alluser.map(e=>(<option value={e.id}>{e.username}</option>))}
                 
                <option value=""></option>
              </select>
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
            <Label htmlFor="type">Bonus Type</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REFERRAL">Referral</SelectItem>
                <SelectItem value="DEPOSIT">Deposit</SelectItem>
                <SelectItem value="INVESTMENT">Investment</SelectItem>
                <SelectItem value="RANKING">Ranking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="note">Note</Label>
            <Textarea
              id="note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="bg-slate-700 border-slate-600"
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {bonus ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
