import mongoose from "mongoose";

const foundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: "" },
  category: { type: String, required: true },
  description: { type: String, default: "" },
  location: { type: String, required: true },
  isImportantDoc: { type: Boolean, default: false },
  hiddenHints: { type: String, default: "" },
  image: { type: String, default: "" },
  claimed: { type: Boolean, default: false },
  status: { type: String, default: "active" },
  dateReported: { type: Date, default: Date.now },
  userId: { type: String, required: true } // ✅ ADD THIS
}, { timestamps: true });

export default mongoose.model("Found", foundSchema);