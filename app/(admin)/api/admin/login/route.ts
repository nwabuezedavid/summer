import { type NextRequest, NextResponse } from "next/server"

const ADMIN_EMAIL = "admin@example.com"
const ADMIN_PASSWORD = "admin123"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = Buffer.from(`${email}:${password}`).toString("base64")
      return NextResponse.json({ token }, { status: 200 })
    }

    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  } catch {
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
