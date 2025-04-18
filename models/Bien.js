import mongoose from "mongoose"

const bienSchema = new mongoose.Schema({
  titre:        { type: String, required: true },
  description:  { type: String },
  prix:         { type: Number, required: true },
  statut:       { type: String, enum: ['disponible', 'réservé', 'vendu'], default: 'disponible' },
  type:         { type: mongoose.Schema.Types.ObjectId, ref: 'Type' },
  categorie:    { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' },
  localisation: { type: mongoose.Schema.Types.ObjectId, ref: 'Localisation' },
  images:       [{ type: String }], // URLs Cloudinary
  postedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // agent ou admin
}, { timestamps: true })

export default mongoose.model("Bien", bienSchema)
