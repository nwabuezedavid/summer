import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Transfer model type
interface Transfer {
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

    const updatedTransfer = await prisma.transfer.update({
      where: {
        id: id,
      },
      data,
    });

    if (!updatedTransfer) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (updatedTransfer.status === 'approved') {
      const receiver = await prisma.User.findUnique({
        where: {
          email: updatedTransfer.receiverEmail, // assuming receiverEmail is the field that stores the receiver's email
        },
      });

      if (receiver) {
        await prisma.User.update({
          where: {
            email: updatedTransfer.receiverEmail,
          },
          data: {
            mainBalance: receiver.mainBalance + updatedTransfer.amount,
          },
        });
      }
    }

    return NextResponse.json(updatedTransfer);
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

    await prisma.transfer.delete({
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