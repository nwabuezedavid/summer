"use server"
import { getSession } from '@/lib/session'
import React from 'react'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createNotification } from './authaction'
import prisma from './db'
 function generateReferralCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
export const sedMoney =  async (data) => {
const session  = await getSession()
if (!session) return null

const s = await prisma.user.findUnique({
where:{
    email:data.email
}

})

console.log(session);
console.log(data);

if (!s && session.email !== data.email) return 'email does not exist'
if (   session.mainBalance <= data.amount   ||   data.amount <= 50 || session.mainBalance < 1   ) return 'insufficient fund to transfer'
const user = await prisma.user.update({
     where:{
        id:session.id
     },
     data:{
             mainBalance: { decrement: data.amount },
    transfers:{
        create: [
            {
                amount:data.amount,
                email:data.email,
                txId:generateReferralCode()

            }
        ]
    }
 
     }
})
createNotification({
  userId: session.id,
  title: `Money Sent`,
  message: `You have sent ${data.amount} to ${s.username}. The transaction is being processed.`,
})
   revalidatePath ('/send-money-log')
   return `You have sent ${data.amount} to ${s.username}. The transaction is being processed.`
}
export const getMonety = async () => {
  const session = await getSession()
  if (!session) return null

  const transfers = await prisma.Transfer.findMany({
    where: {
      userId: session.id
    }
  })

  console.log(transfers);

  const plas = transfers.map(transfer => ({
    ...transfer,
    amount: "$"+ Number(transfer.amount),
    createdAt: transfer.createdAt.toISOString(), // convert Date to string
  }));

  return plas
}