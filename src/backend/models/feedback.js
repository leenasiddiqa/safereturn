import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, default: 5 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Feedback", feedbackSchema);