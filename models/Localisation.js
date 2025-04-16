// models/Localisation.js Abdallah
import mongoose from "mongoose"
const localisationSchema = new mongoose.Schema({ ville: { type: String, required: true } })
export default mongoose.model("Localisation", localisationSchema)
