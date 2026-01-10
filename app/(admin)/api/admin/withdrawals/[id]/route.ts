import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

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