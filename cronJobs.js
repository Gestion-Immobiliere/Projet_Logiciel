import cron from 'node-cron';
import Reservation from './models/Reservation.js';
import Bien from './models/Bien.js';
import stripe from './config/stripe.js';

cron.schedule('*/5 * * * *', async () => {
  const now = new Date();
  const reservations = await Reservation.find({ status: 'en attente' });
  for (const reservation of reservations) {
    const createdAt = new Date(reservation.createdAt);
    const oneHourLater = new Date(createdAt.getTime() + 60 * 60 * 1000); // 1 heure
    if (now > oneHourLater) {
      try {
        const session = await stripe.checkout.sessions.retrieve(reservation.stripeSessionId);
        if (session.payment_status !== 'paid') {
          reservation.status = 'annulée';
          await reservation.save();
          const bien = await Bien.findById(reservation.bien);
          if (bien) {
            bien.statut = 'disponible';
            await bien.save();
          }
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de la session Stripe:', err);
      }
    }
  }
});

export default cron;