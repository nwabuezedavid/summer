'use client';

import { getMonety } from "@/action/sedmoney";
import DataTable from "@/componenet/tableall";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const columns = [
  {
    key: 'note',
    label: 'Description',
  },
  {
    key: 'txId',
    label: 'Transaction ID',
  }, 
  
  { key: "type", label: "Transaction type" },

  {
    key: 'email',
    label: 'To',
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value) => (
      <span className="text-red-400 font-medium">
        {value}
      </span>
    ),
  },
  {
    key: 'statue',
    label: 'Status',
    render: (value) => {
      const map = {
        Success: 'bg-emerald-500/20 text-emerald-400',
        Pending: 'bg-yellow-500/20 text-yellow-400',
        Failed: 'bg-red-500/20 text-red-400',
      };

      return (
        <span className={`px-2 py-1 text-xs rounded ${map[value]}`}>
          {value}
        </span>
      );
    },
  },
  {
    key: 'createdAt',
    label: 'Date',
  },
];

const data = [
  {
    description: 'Send money to user',
    txId: 'SMX-903423',
    to: 'john@example.com',
    amount: '-100 USD',
    status: 'Success',
    createdAt: 'Jan 12, 2025',
  },

];

export default function SendMoneyLogPage() {
  const [datax, setdatax] = useState([])
  useEffect(() => {


    getMonety()
      .then(e => {
        setdatax(e)
      })
      .catch(d => toast.error(d))
    console.log(datax);

  }, [])

  return (
    <DataTable
      title="Send Money Log"
      columns={columns}
      data={datax}
      pageSize={5}
    />
  );
}
