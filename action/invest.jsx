"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
 
import { redirect } from "next/navigation";
  

export async function investAction(formData) {
  // 🔐 Get logged-in user
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const userId = session.id;

  // 📥 Read POST data
  const planId = parseInt(formData.get("planId"), 10);
  const amount = parseFloat(formData.get("amount"));
  const wallet = formData.get("wallet"); // MAIN | PROFIT

  if (!planId || !amount || amount <= 0 || !wallet) {
    return {error:"Invalid investment data"};
  }

  // 📌 Fetch investment plan
  const plan = await prisma.investmentPlan.findUnique({
    where: { id: planId },
  });

  if (!plan || !plan.isActive) {
     return  {error:"Investment plan not available"};
  }

  // 📏 Validate min / max
  if (amount < plan.minAmount) {
    return {error:`Minimum investment is ${plan.minAmount} USD`};
     
  }

  if (plan.maxAmount && amount > plan.maxAmount) {
    return {error:`Maximum investment is ${plan.maxAmount} USD`};
  }

  // 👤 Fetch user balances
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      mainBalance: true,
      profitBalance: true,
    },
  });

  const balance =
    wallet === "PROFIT" ? user.profitBalance : user.mainBalance;

  if (balance < amount) {
    return {error:"Insufficient wallet balance"};
  }

  // 🧮 Calculate profit and end date
  const profit = (amount * plan.profitPercent) / 100;
  const endsAt = new Date();
  endsAt.setDate(endsAt.getDate() + plan.durationDays);

  // 🔄 ATOMIC TRANSACTION (VERY IMPORTANT)
  await prisma.$transaction([
    // 1️⃣ Deduct wallet balance
    prisma.user.update({
      where: { id: userId },
      data:
        wallet === "PROFIT"
          ? { profitBalance: { decrement: amount } }
          : { mainBalance: { decrement: amount } },
    }),

    // 2️⃣ Create investment
    prisma.investment.create({
      data: {
        userId,
        planId,
        amount,
        profit,
        endsAt,
      },
    }),

    // 3️⃣ Log transaction
    prisma.transaction.create({
      data: {
        userId,
        title: `Investment in ${plan.name}`,
        type: "INVESTMENT",
        amount,
        status: "APPROVED",
      },
    }),
  ]);

  // ✅ Redirect after success
  redirect("/schema-log");
}
