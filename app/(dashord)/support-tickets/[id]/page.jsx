// app/(dashboard)/support-tickets/[id]/page.jsx
"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export default async function TicketDetailPage({ params }) {
  const session = await getSession();
  if (!session) redirect("/login");
  const{id} = await params
console.log( id);

  const ticketId = Number(id);
  if (!ticketId) notFound();

  const ticket = await prisma.supportTicket.findFirst({
    where: {
      id: ticketId,
      userId: session.id, // 🔒 user can only view own ticket
    },
  });

  if (!ticket) notFound();

  return (
    <div className="w-full bg-[#062f44] text-white p-6 rounded-xl border border-white/10 max-sm:pb-[180px]">

      {/* Header */}
      <h2 className="text-sm font-semibold mb-6 border-b border-white/10 pb-3">
        Support Ticket Details
      </h2>

      {/* Ticket Info */}
      <div className="space-y-4 text-sm">

        <Row label="Ticket ID" value={`#${ticket.id}`} />

        <Row label="Subject" value={ticket.subject} />

        <Row
          label="Status"
          value={
            <StatusBadge status={ticket.status} />
          }
        />

        <Row
          label="Created At"
          value={new Date(ticket.createdAt).toLocaleString()}
        />

        {ticket.image && (
          <Row
            label="Attachment"
            value={
              <a
                href={ticket.image}
                target="_blank"
                className="text-indigo-400 underline"
              >
                View Attachment
              </a>
            }
          />
        )}

        <Row
          label="Message"
          value={
            <p className="bg-[#041f2e] border border-white/10 rounded p-4 text-slate-200">
              {ticket.message}
            </p>
          }
        />
      </div>
    </div>
  );
}




function Row({ label, value }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-3">
      <span className="text-slate-300">{label}</span>
      <div className="md:col-span-2">{value}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    OPEN: "bg-emerald-500/20 text-emerald-400",
    PENDING: "bg-yellow-500/20 text-yellow-400",
    CLOSED: "bg-slate-500/20 text-slate-300",
  };

  return (
    <span className={`px-3 py-1 rounded text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  );
}
