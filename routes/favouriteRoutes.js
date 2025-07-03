import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { addToFavourites, removeFromFavourites, getFavourites } from "../controllers/FavouriteController.js";

const router = express.Router();

router.post('/add', requireAuth, addToFavourites);
router.delete('/remove/:bienId', requireAuth, removeFromFavourites);
router.get('/', requireAuth, getFavourites);

export default router;