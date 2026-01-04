"use client";

import DataTable from "@/componenet/tableall";

const columns = [
  { key: "description", label: "Description" },
  { key: "txId", label: "Transaction ID" },
  { key: "type", label: "Transaction type" },
  {
    key: "amount",
    label: "Amount",
    render: (v) => <span className="text-green-400">{v}</span>,
  },
  { key: "fee", label: "Fee" },
  {
    key: "status",
    label: "Status",
    render: (v) => (
      <span
        className={`px-2 py-1 text-xs rounded ${
          v === "Success"
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-yellow-500/20 text-yellow-400"
        }`}
      >
        {v}
      </span>
    ),
  },
  { key: "method", label: "Method" },
];

export default function DepositLogTable({ data }) {
  return (
    <DataTable
      title="All Deposit Log"
      columns={columns}
      data={data}
      pageSize={5}
    />
  );
}
