'use client';

import PageHeader from "@/componenet/header";
import DataTable from "@/componenet/tableall";

 

const columns = [
  {
    key: 'subject',
    label: 'Subject',
  },
  {
    key: 'ticketId',
    label: 'Ticket ID',
  },
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
  {
    key: 'createdAt',
    label: 'Created',
  },
  {
    key: 'action',
    label: 'Action',
    render: (_, row) => (
      <button className="px-3 py-1 text-xs rounded bg-indigo-500 hover:bg-indigo-400">
        View
      </button>
    ),
  },
];

const data = [
  {
    subject: 'Unable to withdraw funds',
    ticketId: 'TCK-10239',
    priority: 'High',
    status: 'Open',
    createdAt: '2025-01-10',
  },
  {
    subject: 'Deposit not credited',
    ticketId: 'TCK-10210',
    priority: 'Medium',
    status: 'Pending',
    createdAt: '2025-01-08',
  },
  {
    subject: 'Account verification',
    ticketId: 'TCK-10192',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2025-01-02',
  },
];

export default function SupportTicketsPage() {
  return (
    <>

            <PageHeader
  title="Support Tickets"
  actionLabel="Create Support Tickets"
  actionHref="/create-support-tickets"
/>
    <DataTable
      title="Support Tickets"
      columns={columns}
      data={data}
      pageSize={5}
    />
    </>
  );
}
