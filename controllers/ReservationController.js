import Reservation from '../models/Reservation.js';
import Bien from '../models/Bien.js';
import stripe from '../config/stripe.js';

export const getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('bien')
      .populate('client', 'nom email');
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    if (reservation.client._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }
    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Réservation non trouvée' });
    }
    if (reservation.client._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Accès non autorisé' });
    }

    const session = await stripe.checkout.sessions.retrieve(reservation.stripeSessionId);
    if (session.payment_status === 'paid') {
      reservation.status = 'confirmée';
      reservation.datePaiement = new Date();
      await reservation.save();
      return res.status(200).json({ status: 'success', message: 'Paiement confirmé' });
    } else {
      reservation.status = 'annulée';
      await reservation.save();
      const bien = await Bien.findById(reservation.bien);
      if (bien) {
        bien.statut = 'disponible';
        await bien.save();
      }
      return res.status(400).json({ status: 'error', message: 'Paiement non confirmé' });
    }
  } catch (err) {
    console.error('Erreur lors de la vérification du paiement:', err);
    res.status(500).json({ message: err.message });
  }
};