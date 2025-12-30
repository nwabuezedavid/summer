"use server";

import prisma from "@/action/db";
import { notFound } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function TransactionDetailPage({ params }) {
  const session = await getSession();
  if (!session) notFound();

  const { type, id } = params;
  const recordId = Number(id);

  if (!recordId) notFound();

  let data = null;
  let title = "";

  /* ---------------- SWITCH BY TYPE ---------------- */

  switch (type) {
    case "deposit":
      title = "Deposit Details";
      data = await prisma.deposit.findFirst({
        where: { id: recordId, userId: session.id },
      });
      break;

    case "withdrawal":
      title = "Withdrawal Details";
      data = await prisma.withdrawal.findFirst({
        where: { id: recordId, userId: session.id },
      });
      break;

    case "investment":
      title = "Investment Details";
      data = await prisma.investment.findFirst({
        where: { id: recordId, userId: session.id },
        include: { plan: true },
      });
      break;

    case "transfer":
      title = "Transfer Details";
      data = await prisma.transfer.findFirst({
        where: { id: recordId, userId: session.id },
      });
      break;

    case "bonus":
      title = "Bonus Details";
      data = await prisma.bonus.findFirst({
        where: { id: recordId, userId: session.id },
      });
      break;

    default:
      notFound();
  }

  if (!data) notFound();

  return (
    <div className="max-w-4xl mx-auto bg-[#062f44] border border-white/10 rounded-xl p-6 text-white">

      <h2 className="text-sm font-semibold border-b border-white/10 pb-3 mb-6">
        {title}
      </h2>

      <DetailRow label="ID" value={data.id} />
      <DetailRow label="Status" value={data.status ?? "—"} highlight />
      <DetailRow label="Amount" value={`${Number(data.amount)} USD`} />
      
      {"crypto" in data && (
        <DetailRow label="Method" value={data.crypto} />
      )}

      {"wallet" in data && (
        <DetailRow label="Wallet" value={data.wallet} />
      )}

      {"fromWallet" in data && (
        <>
          <DetailRow label="From Wallet" value={data.fromWallet} />
          <DetailRow label="To Wallet" value={data.toWallet} />
        </>
      )}

      {"plan" in data && data.plan && (
        <>
          <DetailRow label="Plan" value={data.plan.name} />
          <DetailRow
            label="Profit %"
            value={`${Number(data.plan.profitPercent)}%`}
          />
          <DetailRow
            label="Duration"
            value={`${data.plan.durationDays} days`}
          />
        </>
      )}

      {"profit" in data && (
        <DetailRow
          label="Expected Profit"
          value={`${Number(data.profit)} USD`}
        />
      )}

      {"proof" in data && data.proof && (
        <div className="mt-4">
          <p className="text-xs text-slate-300 mb-2">Proof Image</p>
          <a
            href={data.proof}
            target="_blank"
            className="text-cyan-400 underline text-sm"
          >
            View Proof
          </a>
        </div>
      )}

      <DetailRow
        label="Created At"
        value={new Date(data.createdAt).toLocaleString()}
      />
    </div>
  );
}

/* ---------------- UI COMPONENT ---------------- */

function DetailRow({ label, value, highlight }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 border-b border-white/10 py-3">
      <span className="text-slate-300 text-sm">{label}</span>
      <span
        className={`md:col-span-2 text-sm ${
          highlight ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
