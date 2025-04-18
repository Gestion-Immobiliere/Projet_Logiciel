// routes/authRoutes.js
import express from "express"
import { register, login, logout } from "../controllers/AuthController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { getProfile, updateProfile } from "../controllers/UserController.js"
import { forgotPassword, resetPassword } from "../controllers/AuthController.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

//routes pour récuperer les informations de l'utilisateur connecté 
router.get("/profile", requireAuth, getProfile)
router.put("/profile", requireAuth, updateProfile) // 🔄 mise à jour profil

router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router
