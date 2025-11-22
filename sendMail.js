import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { number, problem } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gesigahag@gmail.com",
      pass: "wfmzlpbasyxovltl"   // tanpa spasi
    }
  });

  const mailOptions = {
    from: "gesigahag@gmail.com",
    to: "support@support.whatsapp.com",   // bisa diganti
    subject: `Login is not available`,
    text: `
Nomor: ${number}

Masalah:
${problem}
`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email berhasil dikirim!" });
  } catch (error) {
    res.status(500).json({ message: "Gagal mengirim email", error });
  }
}