import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  service: process.env.SMTP_SERVICE,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_MAIL_PASS,
  },
});

export async function sendEmail(options) {
  try {
    await transporter.sendMail({
      from: `no.reply@eyeop.com<${process.env.SMTP_MAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
}
