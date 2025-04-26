import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { addToFavourites, removeFromFavourites } from "../controllers/FavouriteController.js";


const router = express.Router();

router.post('/add', requireAuth, addToFavourites);
router.delete('/remove/:bienId', requireAuth, removeFromFavourites);

export default router;