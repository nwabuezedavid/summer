import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Deposit model type
interface Deposit {
  id: number;
  // Add other properties as needed
}

export async function PUT(request: NextRequest, { params }: { params: { id: number} }) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
     const { id:numberc } = await params;
    const id = Number(numberc);
    const data = await request.json();
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
    const updatedDeposit = await prisma.Deposit.update({
      where: {
        id,
      },
      data,
    });

    if (!updatedDeposit) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    if (updatedDeposit.status === 'approved') {
      const user = await prisma.User.findUnique({
        where: {
          id: updatedDeposit.userId,
        },
      });

      if (user) {
        await prisma.User.update({
          where: {
            id: updatedDeposit.userId,
          },
          data: {
            mainBalance: user.mainBalance + updatedDeposit.amount,
          },
        });
      }
    }

    return NextResponse.json(updatedDeposit);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number} }) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    
     const { id:numberc } = await params;
    const id = Number(numberc);

    await prisma.Deposit.delete({
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