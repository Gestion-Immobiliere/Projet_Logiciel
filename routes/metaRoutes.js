import express from "express"
import {
  addType, getTypes,
  addCategorie, getCategories,
  addLocalisation, getLocalisations, getMessages, getContacts
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

//Route de récupération des messages entre deux utilisateurs
router.get('/messages/:userId1/:userId2', requireAuth, getMessages);

//Route de récupération des contacts (userID) d'un utilisateur à partir du mail
router.get('/contacts/:email', requireAuth, getContacts);

export default router
