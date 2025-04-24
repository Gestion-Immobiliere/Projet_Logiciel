// controllers/UserController.js
import User from "../models/User.js"
import bcrypt from "bcrypt"

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" })

    const { nom, prenom, email, password, telephone } = req.body

    if (nom) user.nom = nom
    if (prenom) user.prenom = prenom
    if (email) user.email = email
    if (telephone) user.telephone = telephone
    if (password) {
      const hashed = await bcrypt.hash(password, 10)
      user.password = hashed
    }

    await user.save()

    res.status(200).json({ message: "Profil mis à jour avec succès" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
