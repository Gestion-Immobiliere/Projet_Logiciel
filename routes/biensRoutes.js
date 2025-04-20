import express from "express"
import multer from "multer"
import { createBien, getAllBiens, getBienById, deleteBien, filtrerBiens, updateBien } from "../controllers/BienController.js"
import { requireAuth, checkRole } from "../middlewares/authMiddleware.js"


const router = express.Router()
const upload = multer({ dest: "uploads/" })

// Seuls les agents/admin peuvent créer un bien
router.post("/", requireAuth, checkRole("admin", "agent"), upload.array("images"), createBien)

router.get("/", getAllBiens)
router.get("/filtre", filtrerBiens)
router.put(
    "/:id",
    requireAuth,
    checkRole("admin", "agent"),
    upload.array("images"), // si on veut gérer aussi le remplacement des images
    updateBien
  )
router.get("/:id", getBienById)
router.delete("/:id", requireAuth, checkRole("admin", "agent"), deleteBien)


export default router
