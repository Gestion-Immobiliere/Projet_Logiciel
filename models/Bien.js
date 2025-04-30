import mongoose from "mongoose"
import { type } from "os"

const bienSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  prix: { type: Number, required: true },
  stripeProductId: {
    type: String, // ID du produit Stripe (lié à ce bien)
  },
  stripePriceId: {
    type: String, // ID du prix Stripe
  },
  idAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  idAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  statut: { type: String, enum: ['disponible', 'réservé', 'vendu'], default: 'disponible' },
  surface: { type: Number }, // ✅ superficie en m²
  nombreChambres: { type: Number }, // ✅ nombre de chambres
  nombreSallesBain: { type: Number },
  type: { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
  localisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Localisation' },
  images: [{ type: String }], // URLs Cloudinary
}, { timestamps: true })

export default mongoose.model("Bien", bienSchema)
