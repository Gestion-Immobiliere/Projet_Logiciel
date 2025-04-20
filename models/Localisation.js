import mongoose from "mongoose"

const localisationSchema = new mongoose.Schema({
  ville: { type: String, required: true, unique: true }
})

export default mongoose.model("Localisation", localisationSchema)
