// models/Reservation.js Sammuel
import mongoose from "mongoose"

const reservationSchema = new mongoose.Schema({
  bien: { type: mongoose.Schema.Types.ObjectId, ref: 'Bien', required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['en attente', 'confirmée', 'annulée'], default: 'en attente' },
  datePaiement: { type: Date },
  montant: { type: Number },
  dureeValidite: { type: Number } //en jour
}, { timestamps: true })

export default mongoose.model("Reservation", reservationSchema)
