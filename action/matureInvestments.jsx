"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
import { createNotification } from "./authaction";

export async function matureInvestments() {
  const now = new Date();
const session = await getSession();
  try {
    const investments = await prisma.investment.findMany({
      where: {
        userId: session.id,
        status: "RUNNING",
        endsAt: { lte: now },
      },
      include: {
        plan: true,
      },
    });

    console.log(investments);

    let maturedCount = 0;

    for (const inv of investments) {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: inv.userId },
          data: {
            profitBalance: {
              increment: inv.profit + inv.amount ,
            },
          },
        }),

        prisma.investment.update({
          where: { id: inv.id },
          data: {
            status: "COMPLETED",
            
          },
        }),

        prisma.transaction.create({
          data: {
            userId: inv.userId,
            title: "Investment Matured",
            type: "INVESTMENT",
            amount: inv.profit,
            fee: 0,
            status: "APPROVED",
          },
        }),
      ]);

      maturedCount++;

      
      createNotification({
        userId: inv.userId, // Use inv.userId instead of session.id
        title: `Investment Reminder`,
        message: `Your investment of ${inv.amount} in the investment Plan has matured. Please take action to continue earning.`,
      })
    }

    return { matured: maturedCount };
  } catch (error) {
    console.error("Error maturing investments:", error);
    throw error;
  }
}