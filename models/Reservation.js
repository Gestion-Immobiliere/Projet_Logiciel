import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  bien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bien',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Authentification obligatoire
  },
  montant: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['en attente', 'confirmée', 'annulée'],
    default: 'en attente'
  },
  datePaiement: {
    type: Date,
    required: true // Rempli lors de la création
  },
  dureeValidite: {
    type: Number, // En jours
    required: true // Obligatoire pour la durée de location
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("Reservation", reservationSchema);