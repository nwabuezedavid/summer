"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function withdrawAction(formData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const method = formData.get("method"); // BTC | USDT | ETH
  const amount = Number(formData.get("amount"));
  const wallet = "MAIN"; // or PROFIT if you later add switch

  if (!method || !amount || amount <= 0) {
    return { error: "Invalid withdrawal data" };
  }

  // 🔍 Get user balances
  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      mainBalance: true,
      profitBalance: true,
    },
  });

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

  redirect("/withdraw-log");
}
