"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";

/**
 * Recursively build referral tree
 */
async function buildTree(userId) {
  const children = await prisma.user.findMany({
    where: { referredById: userId },
    select: {
      id: true,
      username: true,
      investments: {
        select: {
          amount: true,
          profit: true,
        },
      },
    },
  });

  return Promise.all(
    children.map(async (child) => {
      const deposit = 0; // you can sum deposits here later
      const invest = child.investments.reduce(
        (sum, i) => sum + Number(i.amount),
        0
      );
      const roi = child.investments.reduce(
        (sum, i) => sum + Number(i.profit),
        0
      );

      return {
        id: child.id,
        name: child.username,
        stats: { deposit, invest, roi },
        children: await buildTree(child.id),
      };
    })
  );
}

/**
 * Public function
 */
export async function getReferralTree() {
  const session = await getSession();
  if (!session) return null;

  const rootUser = await prisma.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      referralCode: true,
    },
  });

  const tree = {
    id: rootUser.id,
    name: `It's Me (${rootUser.username})`,
    children: await buildTree(rootUser.id),
  };

  return {
    referralUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/register?invite=${rootUser.referralCode}`,
    tree,
  };
}






