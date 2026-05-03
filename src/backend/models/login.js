import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup', required: true } 
}, {
  timestamps: true 
});
export default mongoose.model("Login", loginSchema);