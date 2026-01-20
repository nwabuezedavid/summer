"use server";

import cloudinary from "@/action/cloundinary";

export async function uploadKycToCloudinary(
  file: File,
  userId: string
) {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const result: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "kyc",
        public_id: userId,
        resource_type: "auto",
      },
      (error, res) => {
        if (error) reject(error);
        else resolve(res);
      }
    ).end(buffer);
  });

  return {
    success: true,
    url: result.secure_url,
  };
}
