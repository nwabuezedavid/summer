"use client"
 import {getOneuser,getAlluser} from "@/components/admin/action"; 

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import SubmitButton from "@/action/btnwe";
 

export default function BonusModal({ bonus, onSave, onClose }) {
  const [formData, setFormData] = useState ({
  
    address: "",
    name: " ",
 
  })
 
  useEffect(() => {
    if (bonus) {
      setFormData(bonus)
    }
 

  }, [bonus])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle>{bonus ? "Edit wallet address" : "Add Wallet Address"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full  ">
            <div>
              
              <Label htmlFor="userId">User ID</Label>
               

              <select className="bg-slate-700 border-slate-600 w-full p-3 mt-4"
                required name="address" id="address" onChange={(e) => setFormData({ ...formData, name: e.target.value })}>
                <option value=''> select wallet address</option>
 
                 
              <option value="BTC">Bitcoin (BTC)</option>
<option value="ETH">Ethereum (ETH)</option>
<option value="USDT">Tether (USDT)</option>
<option value="USD">USD Coin (USDC)</option>
<option value="BNB">BNB (BNB)</option>
<option value="ADA">Cardano (ADA)</option>
<option value="XRP">XRP (XRP)</option>
<option value="SOL">Solana (SOL)</option>
<option value="DOGE">Dogecoin (DOGE)</option>
<option value="DOT">Polkadot (DOT)</option>
<option value="TRON">TRON</option>
              </select>
            </div>

             
          </div>

          

          <div>
            <Label htmlFor="note">Wallet Adress</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="bg-slate-700 border-slate-600"
            />
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
