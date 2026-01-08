"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
 
import { redirect } from "next/navigation";
import { sendEmail } from "./mail";
import { investmentEmail } from "./email/invest";
import { createNotification } from "./authaction";
  

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
  const inves = await prisma.$transaction([
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
      select:{
        plan:true,
        amount:true,
        startedAt:true,
        endsAt:true,
      }
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

  console.log(inves[2],'first');
   console.log(inves[1].plan.name,'secon');
  console.log(inves[0],'secossdsdn');
   createNotification({
  userId,
  title:`Investment Activated ${plan.name}`,
  message:`You have successfully invested ${inves[1].amount} in the ${inves[1].plan.name}. Your earnings will start accruing shortly.`,
})
const sjdj = await sendEmail({
  to: session.email ,
  subject: ` ${process.env.NEXT_PUBLIC_SITE_NAME}your investment ${inves[1].plan.name}`,
  html: investmentEmail({
    username: session?.username,
    amount:  amount,
    plan: inves[1].plan.name,
    profitPercent:inves[1].plan.profitPercent,
  duration:inves[1].plan.durationDays,
  startDate:inves[1].startedAt,
  endDate:inves[1].endsAt,
  }),
});

console.log(sjdj);

  // ✅ Redirect after success
  redirect("/schema-log");
   
}
