import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Ticket model type
interface Ticket {
  id: number;
  // Add other properties as needed
}

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tickets = await prisma.SupportTicket.findMany({
      include:{
        
user :true,
 
      }
    });
    return NextResponse.json(tickets);
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
    const newTicket = await prisma.ticket.create({
      data,
    });

    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}