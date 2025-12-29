'use client';

import DataTable from "@/componenet/tableall";

 

const columns = [
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'txId',
    label: 'Transactions ID',
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
    key: 'fee',
    label: 'Fee',
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => {
      const map = {
        Pending: 'bg-yellow-500/20 text-yellow-400',
        Approved: 'bg-emerald-500/20 text-emerald-400',
        Rejected: 'bg-red-500/20 text-red-400',
      };

      return (
        <span
          className={`px-2 py-1 text-xs rounded ${map[value]}`}
        >
          {value}
        </span>
      );
    },
  },
  {
    key: 'method',
    label: 'Method',
  },
];

const data = [
  {
    description: 'Withdrawal to Bitcoin Wallet',
    txId: 'WDX98JDKS88',
    amount: '-250 USD',
    fee: '5 USD',
    status: 'Pending',
    method: 'Bitcoin',
    createdAt: '2025-01-07',
  },
  {
    description: 'Withdrawal to USDT Wallet',
    txId: 'WDX23HDF923',
    amount: '-500 USD',
    fee: '0 USD',
    status: 'Approved',
    method: 'USDT (TRC20)',
    createdAt: '2025-01-05',
  },
];

export default function WithdrawalLogPage() {
  return (
    <>
       
    <DataTable
      title="All Withdrawal Log"
      columns={columns}
      data={data}
      pageSize={5}
    /></>
  );
}
