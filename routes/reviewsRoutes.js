import express from "express";
import { requireAuth } from "../middlewares/authMiddleware.js";
import { review } from "../controllers/ReviewController.js";

const router = express.Router();

router.post('/', requireAuth, review);

export default router;