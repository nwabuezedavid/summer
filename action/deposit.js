"use server";

import prisma from "@/action/db";
import { getSession } from "@/lib/session";
 
import { redirect } from "next/navigation";
import cloudinary from "./cloundinary";
import { sendEmail } from "./mail";
import { depositEmail } from "./email/deposit";
import { createNotification } from "./authaction";
function generateReferralCode(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}
export async function submitDeposit(formData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  const gateway = formData.get("gateway");
  const amount = Number(formData.get("amount"));
  const file = formData.get("file");

  if (!gateway || !amount || !file) {
    return { error: "Missing required fields" };
  }

  // 🔄 Convert file → buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ☁️ Upload to Cloudinary
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "deposits",
          resource_type: "image",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(buffer);
  });

  // 🧠 ATOMIC DATABASE WRITE
  const deposi = await prisma.$transaction(async (tx) => {
    // 1️⃣ Save Deposit
    await  tx.deposit.create({
      data: {
        userId: session.id,
        amount,
        crypto: gateway,
        txHash: generateReferralCode(),
        proof: uploadResult.secure_url,
        status: "PENDING",
      },
    });

    // 2️⃣ Save Transaction Log
    await tx.transaction.create({
      data: {
        userId: session.id,
        title: `Deposit via ${gateway}`,
        type: "DEPOSIT",
        amount,
        fee: 0,
        status: "PENDING",
        gateway,
      },
    });
   
  });

  
  await sendEmail({
    to: session.email ,
    subject: `${process.env.NEXT_PUBLIC_SITE_NAME}-Deposit via ${gateway}`,
    html: depositEmail({
      username: session.username || 'user',
      amount: amount,
       method:gateway,
    txId:deposi,
    status:'Pending',
     
    }),
  });
createNotification({
  userId: session.id,
  title: `Deposit via ${gateway}`,
  message: `  The deposit tansaction is being processed.`,
})
  redirect("/add-money-log");
}
