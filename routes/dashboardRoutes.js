import express from "express"
import { getDashboard } from "../controllers/DashboardController.js"
import { requireAuth } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", requireAuth, getDashboard)

export default router
