import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Deposit model type
interface Deposit {
  id: number;
  // Add other properties as needed
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const deposits = await prisma.Deposit.findMany({
      include:{
        
user :true,
 
      }
    });
    return NextResponse.json(deposits);
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
    console.log(data);
    
    const newDeposit = await prisma.Deposit.create({
      data,
    });
if (data.status === 'APPROVED') {
  await prisma.user.update({
    where: {
      id: data.userId,
    },
    data: {
      mainBalance: {
        increment: parseFloat(data.amount),
      },
    },
  });
}
    return NextResponse.json(newDeposit, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}