import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";
import { sendEmail } from "@/action/mail";
import { withdrawalEmail } from "@/action/admainmail/withdrwaladmin";

// Define the Withdrawal model type
interface Withdrawal {
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

    
    delete data.user;
     
    const updatedWithdrawal = await prisma.withdrawal.update({
      where: {
        id:id,
      },
      data:data,
    });

 const userAdmin = await prisma.User.findUnique({
        where: {
          id: updatedWithdrawal.userId,
        },
      });
await sendEmail({
      to: userAdmin.email ,
      subject: "withdrawal Status Update",
      html:   withdrawalEmail({
    username: userAdmin.username,
    amount: updatedWithdrawal.amount,
    method: updatedWithdrawal.crypto,
    wallet: updatedWithdrawal.wallet,
    status: updatedWithdrawal.status,
    txId: updatedWithdrawal.id,
  }),
    });
    if (!updatedWithdrawal) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(updatedWithdrawal);
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

    await prisma.withdrawal.delete({
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