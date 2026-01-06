"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Props {
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-slate-800 border-slate-700 p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold text-white mb-4">Confirm Delete</h2>
        <p className="text-slate-300 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>

        <div className="flex gap-3">
          <Button onClick={onCancel} className="flex-1 bg-slate-600 hover:bg-slate-700">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700">
            Delete
          </Button>
        </div>
      </Card>
    </div>
  )
}
