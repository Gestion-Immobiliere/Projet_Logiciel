import express from "express"
import { register, login, logout } from "../controllers/AuthController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"
import { getProfile } from "../controllers/UserController.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

// 🆕 Route pour récupérer les infos du user connecté à partir du token JWT envoyé dans les headers
router.get("/profile", requireAuth, getProfile)

export default router
