// config/nodemailer.js
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // ton email
    pass: process.env.MAIL_PASS  // mot de passe ou App Password
  }
})

export const sendResetEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}` // à adapter côté front

  const mailOptions = {
    from: `"Support Immobilier" <${process.env.MAIL_USER}>`,
    to,
    subject: "Réinitialisation de votre mot de passe",
    html: `
      <p>Bonjour,</p>
      <p>Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour continuer :</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Ce lien expirera dans 1 heure.</p>
    `
  }

  await transporter.sendMail(mailOptions)
}
