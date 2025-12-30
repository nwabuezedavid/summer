"use server";

import prisma from "@/action/db";
 
 
import cloudinary from "./cloundinary";
import { getSession } from "@/lib/session";

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

  return { success: true };
}
