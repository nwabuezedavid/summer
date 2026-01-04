"use server"
import prisma from '../db'

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


