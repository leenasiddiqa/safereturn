import mongoose from "mongoose";

// ✅ Signup Schema
const signupSchema = new mongoose.Schema({
  sapid: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  cnic: { type: String, required: true },
  phone: { type: String, required: true },
});

// ✅ Model export karo
export default mongoose.model("Signup", signupSchema);
