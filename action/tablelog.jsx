"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
 

export async function getDepositLogs() {
  const session = await getSession();
  if (!session) return [];

  const logs = await prisma.Investment.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 🔁 Convert Decimal → Number (IMPORTANT)
  return logs.map((l) => ({
    id: l.id,
    description: l.description,
    txId: l.txId,
    amount: `${l.amount > 0 ? "+" : ""}${Number(l.amount)} USD`,
    fee: `${Number(l.fee)} USD`,
    status: l.status === "SUCCESS" ? "Success" : "Pending",
    method: l.method,
    createdAt: l.createdAt.toISOString().split("T")[0],
  }));
}