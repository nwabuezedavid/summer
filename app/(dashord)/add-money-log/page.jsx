"use client"
import DataTable from "@/componenet/tableall";
 

const columns = [
  { key: 'description', label: 'Description' },
  { key: 'txId', label: 'Transactions ID' },
  {
    key: 'amount',
    label: 'Amount',
    render: (v) => <span className="text-green-400">{v}</span>,
  },
  { key: 'fee', label: 'Fee' },
  {
    key: 'status',
    label: 'Status',
    render: (v) => (
      <span
        className={`px-2 py-1 text-xs rounded ${
          v === 'Success'
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-yellow-500/20 text-yellow-400'
        }`}
      >
        {v}
      </span>
    ),
  },
  { key: 'method', label: 'Method' },
];

const data = [
  {
    description: 'Deposit via Bitcoin',
    txId: 'TRX38U80RYBDX',
    amount: '+400 USD',
    fee: '0 USD',
    status: 'Success',
    method: 'Bitcoin',
    createdAt: '2025-01-06',
  },
];

export default function DepositLogPage() {
  return (
    <DataTable
      title="All Deposit Log"
      columns={columns}
      data={data}
      pageSize={5}
    />
  );
}
