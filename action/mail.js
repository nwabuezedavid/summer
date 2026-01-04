import nodemailer from "nodemailer";

/**
 * Singleton transporter (reused across app)
 */
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false, // true only for port 465
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
  if (!to || !subject || !html) {
    throw new Error("Missing email parameters");
  }

  return transporter.sendMail({
    from: `"${fromName}" <${process.env.EMAIL_HOST_USER}>`,
    to,
    subject,
    html,
  });
}
