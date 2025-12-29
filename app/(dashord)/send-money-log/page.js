'use client';

import DataTable from "@/componenet/tableall";

 
const columns = [
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'txId',
    label: 'Transaction ID',
  },
  {
    key: 'to',
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
    key: 'status',
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
  {
    description: 'Send money to user',
    txId: 'SMX-903410',
    to: 'mary@example.com',
    amount: '-250 USD',
    status: 'Pending',
    createdAt: 'Jan 10, 2025',
  },
];

export default function SendMoneyLogPage() {
  return (
    <DataTable
      title="Send Money Log"
      columns={columns}
      data={data}
      pageSize={5}
    />
  );
}
