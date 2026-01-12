"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { sendEmail } from "./mail";
import { withdrawalEmail } from "./email/withdrawal";

export async function withdrawAction(formData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const method = formData.get("method"); // BTC | USDT | ETH
  const address = formData.get("address"); // BTC | USDT | ETH
  const amount = Number(formData.get("amount"));
  const wallet = "PROFIT"; // or PROFIT if you later add switch

  if (!method || !amount || amount <= 0) {
    return { error: "Invalid withdrawal data" };
  }
  console.log(session);
  
  

  // 🔍 Get user balances
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      mainBalance: true,
      profitBalance: true,
      kycStatus: true,
    },
  });
if (amount >= 499 && user.kycStatus === 'PENDING'  ) {
    return { error: "We haven't verified your KYC. You can't withdraw more than 500" };
  }
  const balance =
    wallet === "MAIN"
      ? Number(user.mainBalance)
      : Number(user.profitBalance);

  if (balance < amount) {
    return { error: "Insufficient wallet balance" };
  }

  // 🔄 Atomic transaction
  await prisma.$transaction([
    // 1️⃣ Withdrawal record
    prisma.withdrawal.create({
      data: {
        userId: session.id,
        amount,
        crypto: method,
        wallet,
        status: "PENDING",
      },
    }),

    // 2️⃣ Transaction log
    prisma.transaction.create({
      data: {
        userId: session.id,
        title: `Withdrawal via ${method}`,
        type: "WITHDRAW",
        amount,
        fee: 0,
        status: "PENDING",
        gateway: method,
      },
    }),

    // 3️⃣ Deduct balance
    prisma.user.update({
      where: { id: session.id },
      data:
        wallet === "MAIN"
          ? { mainBalance: { decrement: amount } }
          : { profitBalance: { decrement: amount } },
    }),
  ]);
await sendEmail({
  to: session.email,
  subject: "Withdrawal Request Update",
  html: withdrawalEmail({
    username: user.username,
    amount: amount,
    method: method,
    status: "Pending",
    txId: "TX-239203",
  }),
});
  redirect("/withdraw-log");
}


 
export async function getSupportTickets() {
  const session = await getSession();
  if (!session) return [];

  const tickets = await prisma.supportTicket.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // ✅ convert to plain objects
  return tickets.map((t) => ({
    id: t.id,
    subject: t.subject,
    ticketId: `TCK-${t.id}`,
    priority: "Medium", // optional (extend schema later)
    status:
      t.status === "OPEN"
        ? "Open"
        : t.status === "CLOSED"
        ? "Closed"
        : "Pending",
    createdAt: t.createdAt.toISOString().split("T")[0],
  }));
}
