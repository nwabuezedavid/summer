"use client";

import { useEffect, useState } from "react";
import DataTable from "@/componenet/tableall";
import { getDepositLogs } from "@/action/tablelog";
 
export const runtime = "nodejs";
/* ---------------- TABLE COLUMNS ---------------- */

const columns = [
  { key: "description", label: "Description" },
  { key: "txId", label: "Transaction ID" },
  {
    key: "amount",
    label: "Amount",
    render: (v) => <span className="text-emerald-400 font-medium">{v}</span>,
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
            : v === "Pending"
            ? "bg-yellow-500/20 text-yellow-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {v}
      </span>
    ),
  },
  { key: "method", label: "Method" },
  { key: "createdAt", label: "Date" },
];

/* ---------------- PAGE ---------------- */

export default function DepositLogPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDepositLogs()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DataTable
      title="All Deposit Log"
      columns={columns}
      data={data}
      pageSize={5}
      loading={loading}
      searchable
      pagination
    />
  );
}
