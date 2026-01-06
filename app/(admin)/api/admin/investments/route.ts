import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Investment model type
interface Investment {
  id: number;
  // Add other properties as needed
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const investments = await prisma.investment.findMany({
      include:{
        
user :true,
plan :true,
      }
    });
    return NextResponse.json(investments);
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
    const newInvestment = await prisma.investment.create({
      data,
    });

    return NextResponse.json(newInvestment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}