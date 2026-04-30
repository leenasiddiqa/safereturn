import mongoose from "mongoose";
const signupSchema = new mongoose.Schema({
  sapid: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
});
export default mongoose.model("Signup", signupSchema);