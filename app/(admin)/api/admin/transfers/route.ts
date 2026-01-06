import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Transfer model type
interface Transfer {
  id: number;
  // Add other properties as needed
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const transfers = await prisma.transfer.findMany({
      include:{
        
user :true,
 
      }
    });
    return NextResponse.json(transfers);
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
    
    const newTransfer = await prisma.transfer.create({
     data:{
       userId: data.userId,
    amount: parseFloat(data.amount),
    email: data.email,
    status: data.status,
     }
    });

    return NextResponse.json(newTransfer, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}