"use client";

import { useEffect, useState } from "react";
import DataTable from "@/componenet/tableforalltrans";
import { getAllTransactions } from "@/action/tablelog";
 

/* ---------------- BADGE STYLES ---------------- */

const TYPE_BADGE = {
  DEPOSIT: "bg-emerald-500/20 text-emerald-400",
  WITHDRAW: "bg-red-500/20 text-red-400",
  TRANSFER: "bg-orange-500/20 text-orange-400",
  INVESTMENT: "bg-indigo-500/20 text-indigo-400",
  BONUS: "bg-pink-500/20 text-pink-400",
};

const STATUS_BADGE = {
  Success: "bg-emerald-500/20 text-emerald-400",
  COMPLETED: "bg-emerald-500/20 text-emerald-400",
  RUNNING: "bg-red-500/20 text-emerald-400",
  Pending: "bg-yellow-500/20 text-yellow-400",
  Failed: "bg-red-500/20 text-red-400",
};

/* ---------------- COLUMNS ---------------- */

const columns = [
  {
    key: "type",
    label: "Type",
    render: (v) => (
      <span className={`px-2 py-1 rounded text-xs ${TYPE_BADGE[v]}`}>
        {v}
      </span>
    ),
  },
  { key: "description", label: "Description" },
  { key: "txId", label: "Transaction ID" },
  {
    key: "amount",
    label: "Amount",
    render: (v, row) => (
      <span
        className={`font-semibold ${
          row.direction === "in"
            ? "text-emerald-400"
            : "text-red-400"
        }`}
      >
        {row.direction === "in" ? "+" : "-"}
        {v.toFixed(2)} USD
      </span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (v) => (
      <span className={`px-2 py-1 text-xs rounded ${STATUS_BADGE[v]}`}>
        {v}
      </span>
    ),
  },
  { key: "createdAt", label: "Date" },
];

export default function TransactionsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTransactions()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataTable
      title="All Transactions"
      columns={columns}
      data={data}
      pageSize={7}
      loading={loading}
      searchable
      pagination
    />
  );
}
