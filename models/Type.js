import mongoose from "mongoose"

const typeSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true }
})

export default mongoose.model("Type", typeSchema)
