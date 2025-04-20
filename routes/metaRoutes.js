import express from "express"
import {
  addType, getTypes,
  addCategorie, getCategories,
  addLocalisation, getLocalisations
} from "../controllers/MetaController.js"

import { requireAuth, checkRole } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Seuls admin/agent peuvent ajouter
router.post("/types", requireAuth, checkRole("admin", "agent"), addType)
router.get("/types", getTypes)

router.post("/categories", requireAuth, checkRole("admin", "agent"), addCategorie)
router.get("/categories", getCategories)

router.post("/localisations", requireAuth, checkRole("admin", "agent"), addLocalisation)
router.get("/localisations", getLocalisations)

export default router
