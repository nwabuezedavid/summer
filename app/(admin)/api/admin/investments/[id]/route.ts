import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";
import { useId } from "react";

// Define the Investment model type
interface Investment {
  id: number;
  // Add other properties as needed
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

     const { id:numberc } = await params;
    const id = Number(numberc);
    const data = await request.json();
    
    const {planId,profit,startedAt,endsAt,status,userId,amount} = data
    console.log(data.user.mainBalance);
    const updatedInvestment = await prisma.investment.update({
      where: {
        id,
      },
      data:{planId,amount,profit,startedAt,endsAt,status}
       
     
    });



if (status === 'COMPLETED'){
  await prisma.user.update({
    where:{          
id:Number(userId)
    },
    data:{
       profitBalance: {
        increment: Number(profit) + Number(amount), // Replace amount with the actual amount
      },
    }
  })
}
    if (!updatedInvestment) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updatedInvestment);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

     const { id:numberc } = await params;
    const id = Number(numberc);

    await prisma.investment.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}