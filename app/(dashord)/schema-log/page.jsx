"use client";

import { useEffect, useState } from "react";
import DataTable from "@/componenet/tableall";
import { getDepositLogs } from "@/action/tablelog";
 

const columns = [
  { key: "plan", label: "amount" },
  { key: "txId", label: "Transactions ID" },
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
          v === "Running"
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

export default function DepositLogPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getDepositLogs().then(setData);
  }, []);

  return (
    <DataTable
      title="All Deposit Log"
      columns={columns}
      data={data}
      pageSize={5}
      searchable
      pagination
    />
  );
}