import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";
function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("Authorization");
  return authHeader?.startsWith("Bearer ") || false;
}

export async function GET(request: NextRequest) {
  try {
    if (!verifyToken(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Replace with actual database queries
    const totalUsers = await prisma.user.count();
    const totalDeposits = await prisma.deposit.aggregate({
      _sum: {
        amount: true,
      },
    });
    const totalInvestments = await prisma.investment.aggregate({
      _sum: {
        amount: true,
      },
    });
    const totalWithdrawals = await prisma.withdrawal.aggregate({
      _sum: {
        amount: true,
      },
    });

    return NextResponse.json({
      totalUsers,
      totalDeposits: totalDeposits._sum.amount || 0,
      totalInvestments: totalInvestments._sum.amount || 0,
      totalWithdrawals: totalWithdrawals._sum.amount || 0,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}