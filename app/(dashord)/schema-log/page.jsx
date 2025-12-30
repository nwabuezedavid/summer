"use client";

import { useEffect, useState } from "react";
import DataTable from "@/componenet/tableall";
import { getDepositLogs, getInvestmentLogs } from "@/action/tablelog";
 
const columns = [
  { key: "description", label: "Description" },
  { key: "amount", label: "Amount" },
  { key: "profit", label: "Profit" },
  { key: "roi", label: "ROI" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status" },
  { key: "startedAt", label: "Start Date" },
  { key: "endsAt", label: "End Date" },
];

export default function DepositLogPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getInvestmentLogs().then(setData);
  }, []);

  return (
    <DataTable
      title="All investment Log"
      columns={columns}
      data={data}
      pageSize={5}
      searchable
      pagination
    />
  );
}