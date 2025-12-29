'use client';

import DataTable from "@/componenet/tableall";

 

const columns = [
  {
    key: 'type',
    label: 'Type',
    render: (value) => {
      const map = {
        Deposit: 'bg-emerald-500/20 text-emerald-400',
        Withdraw: 'bg-red-500/20 text-red-400',
        Send: 'bg-orange-500/20 text-orange-400',
        Invest: 'bg-indigo-500/20 text-indigo-400',
        Referral: 'bg-pink-500/20 text-pink-400',
      };

      return (
        <span className={`px-2 py-1 rounded text-xs ${map[value]}`}>
          {value}
        </span>
      );
    },
  },
  {
    key: 'description',
    label: 'Description',
  },
  {
    key: 'txId',
    label: 'Transaction ID',
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (value, row) => (
      <span
        className={`font-medium ${
          row.direction === 'in'
            ? 'text-emerald-400'
            : 'text-red-400'
        }`}
      >
        {row.direction === 'in' ? '+' : '-'}
        {value} USD
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
    type: 'Deposit',
    description: 'Deposit via Bitcoin',
    txId: 'TXD-82931',
    amount: 400,
    direction: 'in',
    status: 'Success',
    createdAt: 'Jan 12, 2025',
  },
  {
    type: 'Withdraw',
    description: 'Withdrawal to USDT Wallet',
    txId: 'TXW-82912',
    amount: 250,
    direction: 'out',
    status: 'Pending',
    createdAt: 'Jan 11, 2025',
  },
  {
    type: 'Send',
    description: 'Send money to john@example.com',
    txId: 'TXS-82901',
    amount: 100,
    direction: 'out',
    status: 'Success',
    createdAt: 'Jan 10, 2025',
  },
  {
    type: 'Invest',
    description: 'Investment in Bronze Plan',
    txId: 'TXI-82888',
    amount: 300,
    direction: 'out',
    status: 'Success',
    createdAt: 'Jan 09, 2025',
  },
  {
    type: 'Referral',
    description: 'Referral bonus from Level 1',
    txId: 'TXR-82870',
    amount: 50,
    direction: 'in',
    status: 'Success',
    createdAt: 'Jan 08, 2025',
  },
];

export default function page() {
  return (
    <DataTable
      title="All Transactions"
      columns={columns}
      data={data}
      pageSize={7}
    />
  );
}
