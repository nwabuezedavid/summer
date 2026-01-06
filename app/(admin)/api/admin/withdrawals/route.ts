import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Withdrawal model type
interface Withdrawal {
  id: number;
  // Add other properties as needed
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const withdrawals = await prisma.withdrawal.findMany({
      include:{
        
user :true,
 
      }
    });
    return NextResponse.json(withdrawals);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const newWithdrawal = await prisma.withdrawal.create({
      data,
    });

    return NextResponse.json(newWithdrawal, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}