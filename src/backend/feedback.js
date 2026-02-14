import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  type: { type: String, enum: ["feedback", "issue"], required: true },
  message: { type: String, required: true },
  status: { type: String, default: "new" }, // new, reviewed, resolved
  submissionDate: { type: Date, default: Date.now }
});

export default mongoose.model("Feedback", feedbackSchema);