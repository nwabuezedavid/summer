'use client';

import { getSupportTickets } from "@/action/withdrwal";
import PageHeader from "@/componenet/header";
import DataTable from "@/componenet/tableall";
import { useEffect, useState } from "react";
 

const columns = [
  { key: 'subject', label: 'Subject' },
  { key: 'ticketId', label: 'Ticket ID' },
  {
    key: 'priority',
    label: 'Priority',
    render: (value) => {
      const map = {
        Low: 'bg-slate-500/20 text-slate-300',
        Medium: 'bg-yellow-500/20 text-yellow-400',
        High: 'bg-red-500/20 text-red-400',
      };
      return (
        <span className={`px-2 py-1 text-xs rounded ${map[value]}`}>
          {value}
        </span>
      );
    },
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => {
      const map = {
        Open: 'bg-emerald-500/20 text-emerald-400',
        Pending: 'bg-yellow-500/20 text-yellow-400',
        Closed: 'bg-slate-500/20 text-slate-300',
      };
      return (
        <span className={`px-2 py-1 text-xs rounded ${map[value]}`}>
          {value}
        </span>
      );
    },
  },
  { key: 'createdAt', label: 'Created' },
  {
    key: 'action',
    label: 'Action',
    render: (_, row) => (
      <a
        href={`/support-tickets/${row.id}`}
        className="px-3 py-1 text-xs rounded bg-indigo-500 hover:bg-indigo-400"
      >
        View
      </a>
    ),
  },
];

export default function SupportTicketsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSupportTickets()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader
        title="Support Tickets"
        actionLabel="Create Support Ticket"
        actionHref="/create-support-tickets"
      />

      <DataTable
        title="Support Tickets"
        columns={columns}
        data={data}
        pageSize={5}
        loading={loading}
      />
    </>
  );
}
