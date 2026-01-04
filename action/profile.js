"use server";

import prisma from "@/action/db";
 
 import { cookies } from "next/headers";
import cloudinary from "./cloundinary";
import { getSession } from "@/lib/session";
import { createToken } from "@/lib/auth";

export async function updateProfile(formData) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  let avatarUrl;

  const avatar = formData.get("avatar");
  if (avatar && avatar.size > 0) {
    const buffer = Buffer.from(await avatar.arrayBuffer());

    const upload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "avatars" },
        (err, result) => (err ? reject(err) : resolve(result))
      ).end(buffer);
    });

    avatarUrl = upload.secure_url;
  }

  await prisma.user.update({
    where: { id: session.id },
    data: {
      fullName: formData.get("fullName"),
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      country: formData.get("country"),
      address: formData.get("address"),
      avatar: avatarUrl,
    },
  });
const user = await prisma.user.findFirst({
  where: {
    OR: [
      { email: formData.get("email"), },
      { username: formData.get("username"), },
    ],
    // ✅ direct match because it’s plain text
  },
  select: {
    id: true,
    uuid: true,
    username: true,
    email: true,
    avatar: true,
    fullName: true,
    phone: true,
    country: true,
    address: true,
    isActive: true,
    isVerified: true,
    rank: true,
    mainBalance: true,
    profitBalance: true,
    referralCode: true,
    referredById: true,
    createdAt: true,
    updatedAt: true,
    password:true,
    // relations (optional)
    investments: true,
    deposits: true,
    withdrawals: true,
  },
});


 
const plainUser = {
    ...user,
    balance: user.balance ? Number(user.balance) : 0,
    createdAt: user.createdAt ? user.createdAt.toISOString() : null,
  };

 const token = createToken(plainUser);

 const cookieStore = await cookies();
   cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return { success: true };
}
