import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.yourdomain.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@yourdomain.com",
    pass: "your_email_password",
  },
});

export default transporter;