import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the Bonus model type
interface Bonus {
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

    const updatedBonus = await prisma.Bonus.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(updatedBonus);
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

    await prisma.Bonus.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}