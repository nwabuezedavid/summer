"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
import { createNotification } from "./authaction";
import { investmentEmail } from "./admainmail/investment";

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

    let maturedCount = 0;

    for (const inv of investments) {
      const totalAmount = Number(inv.profit) + Number(inv.amount);

      await prisma.$transaction([
        prisma.user.update({
          where: { id: inv.userId },
          data: {
            profitBalance: {
              increment: totalAmount,
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

      await sendEmail({
        to: session.email,
        subject: "Investment Completed",
        html: investmentEmail({
          username: session.username,
          plan: inv.plan.name,
          amount: inv.amount,
          profit: inv.profit,
          duration: inv.plan.duration,
          status: "COMPLETED",
        }),
      });

      createNotification({
        userId: inv.userId,
        title: `Investment Reminder`,
        message: `Your investment of ${inv.amount} in the ${inv.plan.name} Plan has matured.`,
      });
    }

    return { matured: maturedCount };
  } catch (error) {
    console.error("Error maturing investments:", error);
    throw error;
  }
}