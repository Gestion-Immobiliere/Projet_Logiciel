// models/Categorie.js  Abdallah
import mongoose from "mongoose"
const categorieSchema = new mongoose.Schema({ nom: { type: String, required: true } })
export default mongoose.model("Categorie", categorieSchema)
