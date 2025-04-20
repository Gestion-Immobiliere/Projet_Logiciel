import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import crypto from "crypto"

import User from "../models/User.js"
import PasswordReset from "../models/PasswordReset.js"
import { sendResetEmail } from "../config/nodemailer.js"

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  })
}

// 👉 Inscription
export const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, telephone, role } = req.body

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Les mots de passe ne correspondent pas" })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "Utilisateur déjà existant" })
    }

    const user = await User.create({ username, email, password, telephone, role })
    const token = createToken(user)

    res.status(201).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// 👉 Connexion
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Identifiants incorrects" })

    const token = createToken(user)
    res.status(200).json({ user, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 👉 Déconnexion (côté front : suppression du token)
export const logout = (req, res) => {
  res.status(200).json({ message: "Déconnecté avec succès" })
}

// 👉 Mot de passe oublié
export const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "Aucun utilisateur trouvé avec cet email" })

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1h

    await PasswordReset.create({ email, token, expires })

    await sendResetEmail(email, token)

    res.status(200).json({ message: "Email de réinitialisation envoyé" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// 👉 Réinitialisation de mot de passe
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body
  try {
    const reset = await PasswordReset.findOne({ token })
    if (!reset || reset.expires < new Date()) {
      return res.status(400).json({ message: "Token invalide ou expiré" })
    }

    const user = await User.findOne({ email: reset.email })
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" })

      if (!newPassword || newPassword.trim() === "") {
        return res.status(400).json({ message: "Le mot de passe est requis" })
      }
      
      user.password = newPassword
      await user.save()
      
      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères" })
      }
            
      

    await PasswordReset.deleteOne({ token })

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
