// models/Review.js
import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  bien:      { type: mongoose.Schema.Types.ObjectId, ref: 'Bien', required: true },
  client:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  note:      { type: Number, min: 1, max: 5, required: true },
  commentaire: { type: String },
}, { timestamps: true })

export default mongoose.model("Review", reviewSchema)
