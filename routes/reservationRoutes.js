import express from 'express';
import { book } from '../controllers/BienController.js';
import { getReservationById, verifyPayment } from '../controllers/ReservationController.js';
import { requireAuth } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, book);
router.get('/:id', requireAuth, getReservationById);
router.post('/verify-payment/:id', requireAuth, verifyPayment);

export default router;