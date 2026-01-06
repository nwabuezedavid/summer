import { type NextRequest, NextResponse } from "next/server";
import prisma from "@/action/db";
import { log } from "console";

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

export async function GET(request: NextRequest) {
  try {
    if (!verifyToken(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        mainBalance: true,
        profitBalance: true,
        password: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!verifyToken(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    log()
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        username: body.username,
        mainBalance: body.balance || 0,
        password: body.password,
      },
    });

    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}