import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";

// Define the User model type
interface User {
  id: string;
  email: string;
  username: string;
  balance: number;
  password: string;
}

function verifyToken(request: NextRequest): boolean {
  const authHeader = request.headers.get("Authorization");
  return authHeader?.startsWith("Bearer ") || false;
}

export async function PUT(request: NextRequest, { params }: { params: { id: number} }) {
  try {
    if (!verifyToken(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    
     const { id:numberc } = await params;
    const id = Number(numberc);
    const body = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        email: body.email,
        username: body.username,
        mainBalance: body.balance,
        ...(body.password && { password: body.password }),
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: number} }) {
  try {
    if (!verifyToken(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

   
     const { id:numberc } = await params;
    const id = Number(numberc);

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2025') {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}