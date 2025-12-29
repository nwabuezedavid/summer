// app/api/auth/reset-password/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import prisma from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Generate reset token
    const token = crypto.randomBytes(32).toString("hex");

    // Save token in DB (create a PasswordReset model in Prisma)
    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour expiry
      },
    });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_USE_SSL === "true", // true for 465
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // allows self-signed certs
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    // Send email
    await transporter.sendMail({
      from: `"Adoniss Shelters" <${process.env.EMAIL_HOST_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <p>Hello,</p>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" target="_blank">Reset Password</a>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    return NextResponse.json({ message: "Password reset email sent successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send password reset email" }, { status: 500 });
  }
}
