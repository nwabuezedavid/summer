import transporter from "@/action/mail";

 

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  try {
    await transporter.sendMail({
      from: '"Your Site" <support@yourdomain.com>',
      to: email,
      subject: "Test Email",
      html: "<h2>Email sent successfully</h2>",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
