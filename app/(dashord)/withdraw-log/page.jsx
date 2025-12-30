"use client";

import { useEffect, useState } from "react";
import DataTable from "@/componenet/tableall";
import { getWithdrawalLogs } from "@/action/tablelog";
 

const columns = [
  { key: "description", label: "Description" },
  { key: "txId", label: "Transaction ID" },
  {
    key: "amount",
    label: "Amount",
    render: (value) => (
      <span className="text-red-400 font-medium">{value}</span>
    ),
  },
  { key: "fee", label: "Fee" },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const map = {
        Pending: "bg-yellow-500/20 text-yellow-400",
        Approved: "bg-emerald-500/20 text-emerald-400",
        Rejected: "bg-red-500/20 text-red-400",
      };

      return (
        <span className={`px-2 py-1 text-xs rounded ${map[value]}`}>
          {value}
        </span>
      );
    },
  },
  { key: "method", label: "Method" },
];

export default function WithdrawalLogPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getWithdrawalLogs().then(setData);
  }, []);

  return (
    <DataTable
      title="All Withdrawal Log"
      columns={columns}
      data={data}
      pageSize={5}
    />
  );
}
