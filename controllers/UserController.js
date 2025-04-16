// controllers/UserController.js
import User from "../models/User.js"

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password") // on exclut le mot de passe
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
