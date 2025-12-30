"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
 import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

 
import { redirect } from "next/navigation";
import cloudinary from "./cloundinary";

export async function getInvestmentLogs() {
  const session = await getSession();
  if (!session) return [];

  const investments = await prisma.investment.findMany({
    where: {
      userId: session.id,
    },
    include: {
      plan: {
        select: {
          name: true,
          profitPercent: true,
          durationDays: true,
        },
      },
    },
    orderBy: {
      startedAt: "desc",
    },
  });

  // ✅ Convert Prisma data → Client-safe log rows
  return investments.map((inv) => ({
    id: inv.id,

    // what user sees
    description: `Investment in ${inv.plan.name}`,
    plan: inv.plan.name,

    amount: `-${Number(inv.amount)} USD`,
    profit: `+${Number(inv.profit)} USD`,

    status:
      inv.status === "RUNNING"
        ? "Running"
        : inv.status === "COMPLETED"
        ? "Completed"
        : "Cancelled",

    roi: `${Number(inv.plan.profitPercent)}%`,
    duration: `${inv.plan.durationDays} days`,

    startedAt: inv.startedAt.toISOString().split("T")[0],
    endsAt: inv.endsAt.toISOString().split("T")[0],
  }));
}












 

export async function getAllTransactions() {
  const session = await getSession();
  if (!session) return [];

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // ✅ Convert Prisma → Client-safe objects
  return transactions.map((t) => ({
    id: t.id,
    type: t.type, // DEPOSIT, WITHDRAW, TRANSFER, INVESTMENT, BONUS
    description: t.title,
    txId: `TX-${t.id}`, // or store real txId
    amount: Number(t.amount),
    direction:
      t.type === "DEPOSIT" || t.type === "BONUS" ? "in" : "out",
    status:
      t.status === "APPROVED"
        ? "Success"
        : t.status === "PENDING"
        ? "Pending"
        : "Failed",
    createdAt: t.createdAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  }));
}





 

export async function getDepositLogs() {
  const session = await getSession();
  if (!session) return [];

  const logs = await prisma.transaction.findMany({
    where: {
      userId: session.id,
      type: "DEPOSIT",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 🔁 Prisma → Client-safe
  return logs.map((l) => ({
    id: l.id,
    description: l.title,
    txId: `TX-${l.id}`,
    amount: `+${Number(l.amount)} USD`,
    fee: `${Number(l.fee)} USD`,
    status:
      l.status === "APPROVED"
        ? "Success"
        : l.status === "PENDING"
        ? "Pending"
        : "Failed",
    method: l.gateway ?? "—",
    createdAt: l.createdAt.toISOString().split("T")[0],
  }));
}





 

export async function getWithdrawalLogs() {
  const session = await getSession();
  if (!session) return [];

  const withdrawals = await prisma.withdrawal.findMany({
    where: {
      userId: session.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // ✅ Convert Prisma data → table-safe data
  return withdrawals.map((w) => ({
    description: `Withdrawal to ${w.crypto} Wallet`,
    txId: `WD-${w.id}`, // you can replace with real tx hash later
    amount: `-${Number(w.amount)} USD`,
    fee: "0 USD",
    status:
      w.status === "PENDING"
        ? "Pending"
        : w.status === "APPROVED"
        ? "Approved"
        : "Rejected",
    method: w.crypto,
    createdAt: w.createdAt.toISOString().split("T")[0],
  }));
}






export async function createSupportTicket(formData) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const subject = formData.get("title");
  const message = formData.get("description");
  const file = formData.get("file");

  if (!subject || !message) {
    return { error: "Missing required fields" };
  }

  let imageUrl = null;

  // ☁️ Upload image if provided
  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "support-tickets" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    imageUrl = upload.secure_url;
  }

  await prisma.supportTicket.create({
    data: {
      userId: session.id,
      subject,
      message,
      image: imageUrl || null,
    },
  });

  redirect("/support-tickets");
}

 
 

export async function changePassword(formData) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const currentPassword = formData.get("currentPassword");
  const newPassword = formData.get("newPassword");
  const confirmPassword = formData.get("confirmPassword");

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required" };
  }

  if (newPassword.length < 8) {
    return { error: "Password must be at least 8 characters" };
  }

  if (newPassword !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.id },
    select: { password: true },
  });

  if (!user) {
    return { error: "User not found" };
  }

  
  if (!currentPassword == user.password) {
    return { error: "Current password is incorrect" };
  }

  
  await prisma.user.update({
    where: { id: session.id },
    data: { password: newPassword },
  });

  revalidatePath("/change-password");
  return { success: "Password updated successfully" };
}
