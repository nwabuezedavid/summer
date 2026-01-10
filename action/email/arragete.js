"use server"
import prisma from '../db'
import { getSession } from "@/lib/session";
export const arrageteTransfer = async () => {
    const sum = await prisma.Transfer.aggregate({
  _sum: {
    amount: true
  },
  where: {
    userId: session.id
  }
})
  return sum
}
export const arrageteWithdrawal = async () => {
    const sum = await prisma.Withdrawal.aggregate({
  _sum: {
    amount: true
  },
  where: {
    userId: session.id
  }
})
  return sum
}
export const arrageteTransaction = async () => {
    const sum = await prisma.Transaction.aggregate({
  _sum: {
    amount: true
  },
  where: {
    userId: session.id
  }
})
  return sum
}
export const arrageteBonus = async () => {
    const sum = await prisma.Bonus.aggregate({
  _sum: {
    amount: true
  },
  where: {
    userId: session.id
  }
})
  return sum
}
export const arrageteDeposit = async () => {
    const sum = await prisma.Deposit.aggregate({
  _sum: {
    amount: true
  },
  where: {
    userId: session.id
  }
})
  return sum
}
export const arrageteDepositgetMonth = async () => {
    const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const sum = await prisma.Deposit.aggregate({
  _sum: {
    amount: true
  },
  where: {
    createdAt: {
      gte: new Date(`${currentYear}-${currentMonth}-01`),
      lt: new Date(`${currentYear}-${currentMonth + 1}-01`)
    }
  }
})
console.log(sum);

  return Number(sum)
}

 
 
 
 

export async function getDashboardStats() {
  const session = await getSession();
  if (!session) return null;

  const userId = session.id;

  const [
    deposits,
    investments,
    withdrawals,
    transfers,
    bonuses,
    referrals,
    transactions,
  ] = await Promise.all([
    prisma.deposit.aggregate({
      where: { userId, status: "APPROVED" },
      _sum: { amount: true },
      _count: true,
    }),

    prisma.investment.aggregate({
      where: { userId },
      _sum: { amount: true, profit: true },
      _count: true,
    }),

    prisma.withdrawal.aggregate({
      where: { userId, status: "APPROVED" },
      _sum: { amount: true },
      _count: true,
    }),

    prisma.transfer.aggregate({
      where: { userId, statue: "APPROVED" },
      _sum: { amount: true },
      _count: true,
    }),

    prisma.bonus.groupBy({
      by: ["type"],
      where: { userId },
      _sum: { amount: true },
    }),

    prisma.user.count({
      where: { referredById: userId },
    }),

    prisma.transaction.count({
      where: { userId },
    }),
  ]);

  const getBonus = (type) =>
    bonuses.find((b) => b.type === type)?._sum.amount ?? 0;

  return {
    allTransactions: transactions,

    totalDeposit: Number(deposits._sum.amount || 0),
    totalInvestment: Number(investments._sum.amount || 0),
    totalProfit: Number(investments._sum.profit || 0),
    totalWithdraw: Number(withdrawals._sum.amount || 0),
    totalTransfer: Number(transfers._sum.amount || 0),

    referralBonus: Number(getBonus("REFERRAL")),
    depositBonus: Number(getBonus("DEPOSIT")),
    investmentBonus: Number(getBonus("INVESTMENT")),

    totalReferral: referrals,
  };
}



 

export async function getDashboardStatsmodbilescreen() {
  const session = await getSession();
  if (!session) return null;

  const userId = session.id;

  const [
    allTransactions,
    totalDeposit,
    totalInvestment,
    totalWithdraw,
    totalTransfer,
    totalProfit,
    referralBonus,
    depositBonus,
    investmentBonus,
    totalReferral,
    totalTicket,
  ] = await Promise.all([
    // 1️⃣ All Transactions
    prisma.transaction.count({
      where: { userId },
    }),

    // 2️⃣ Total Deposit
    prisma.deposit.aggregate({
      where: { userId, status: "APPROVED" },
      _sum: { amount: true },
    }),

    // 3️⃣ Total Investment
    prisma.investment.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),

    // 4️⃣ Total Withdraw
    prisma.withdrawal.aggregate({
      where: { userId, status: "APPROVED" },
      _sum: { amount: true },
    }),

    // 5️⃣ Total Transfer
    prisma.transfer.aggregate({
      where: { userId, statue: "APPROVED" },
      _sum: { amount: true },
    }),

    // 6️⃣ Total Profit (Investment profit)
    prisma.investment.aggregate({
      where: {
        userId,
        status: "COMPLETED",
      },
      _sum: { profit: true },
    }),

    // 7️⃣ Referral Bonus
    prisma.bonus.aggregate({
      where: { userId, type: "REFERRAL" },
      _sum: { amount: true },
    }),

    // 8️⃣ Deposit Bonus
    prisma.bonus.aggregate({
      where: { userId, type: "DEPOSIT" },
      _sum: { amount: true },
    }),

    // 9️⃣ Investment Bonus
    prisma.bonus.aggregate({
      where: { userId, type: "INVESTMENT" },
      _sum: { amount: true },
    }),

    // 🔟 Total Referral
    prisma.user.count({
      where: { referredById: userId },
    }),

    // 1️⃣1️⃣ Total Support Tickets
    prisma.supportTicket.count({
      where: { userId },
    }),
  ]);

  return {
    allTransactions,

    totalDeposit: Number(totalDeposit._sum.amount || 0),
    totalInvestment: Number(totalInvestment._sum.amount || 0),
    totalWithdraw: Number(totalWithdraw._sum.amount || 0),
    totalTransfer: Number(totalTransfer._sum.amount || 0),
    totalProfit: Number(totalProfit._sum.profit || 0),

    referralBonus: Number(referralBonus._sum.amount || 0),
    depositBonus: Number(depositBonus._sum.amount || 0),
    investmentBonus: Number(investmentBonus._sum.amount || 0),

    totalReferral,
    totalTicket,
  };
}
