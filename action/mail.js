import nodemailer from "nodemailer";

/**
 * Singleton transporter (reused across app)
 */
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false, // ❗ MUST be false for 587
  requireTLS: true,// true only for port 465
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASSWORD,
  },
});

/**
 * Universal email sender
 */
export async function sendEmail({
  to,
  subject,
  html,
  fromName = "Commonwealth Asset Trust Investment company",
}) {
  try {
    if (!to || !subject || !html) {
      throw new Error("Missing email parameters");
    }

    return await transporter.sendMail({
      from: `"${fromName}" <${process.env.EMAIL_HOST_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Email sending failed:", error);
    // re-throw to handle it elsewhere
  }
}
