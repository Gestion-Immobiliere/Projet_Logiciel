// models/PasswordReset.js Abdallah
import mongoose from "mongoose"

const passwordResetSchema = new mongoose.Schema({
  email:    { type: String, required: true },
  token:    { type: String, required: true },
  expires:  { type: Date, required: true },
}, { timestamps: true })

export default mongoose.model("PasswordReset", passwordResetSchema)
