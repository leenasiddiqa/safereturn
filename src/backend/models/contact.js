import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  reply: { type: String, default: "" },      
  status: { type: String, default: "pending" }, 
  repliedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Contact", contactSchema);