import mongoose from "mongoose";

// ✅ Login Schema (Simple version - sirf authentication ke liye)
const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup', required: true } // Signup se link karega
}, {
  timestamps: true // automatically createdAt aur updatedAt add karega
});

// ✅ Model export karo
export default mongoose.model("Login", loginSchema);