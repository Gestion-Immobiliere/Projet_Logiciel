// models/Favoris.js Sammuel
import mongoose from "mongoose"

const favorisSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  biens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bien' }],
}, { timestamps: true })

export default mongoose.model("Favoris", favorisSchema);
