"use server";

import prisma from "@/action/db";

export async function matureInvestments() {
  const now = new Date();

  // 1️⃣ Find potentially matured investments
  const investments = await prisma.investment.findMany({
    where: {
      status: "RUNNING",
      endsAt: { lte: now },
    },
    include: {
      plan: true,
    },
  });

  let maturedCount = 0;

  for (const inv of investments) {
    // 2️⃣ HARD duration validation (no shortcuts)
    const expectedEnd = new Date(
      inv.startedAt.getTime() +
        inv.plan.durationDays * 24 * 60 * 60 * 1000
    );

    if (inv.endsAt.getTime() !== expectedEnd.getTime()) {
      console.warn("⛔ Duration mismatch for investment:", inv.id);
      continue;
    }

    // 3️⃣ Atomic credit + status update
    await prisma.$transaction([
      prisma.user.update({
        where: { id: inv.userId },
        data: {
          profitBalance: {
            increment: inv.profit,
          },
        },
      }),

      prisma.investment.update({
        where: { id: inv.id },
        data: {
          status: "COMPLETED",
          maturedAt: new Date(),
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
  }

  return { matured: maturedCount };
}
