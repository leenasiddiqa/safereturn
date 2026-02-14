import mongoose from "mongoose";

const lostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, default: "" },
  category: { type: String, default: "Other" },
  description: { type: String, default: "" },
  location: { type: String, required: true },
  hiddenHints: { type: String, default: "" },
  image: { type: String, default: "" },
  dateReported: { type: Date, default: Date.now },
  status: { type: String, default: "active" }
  // type field nahi hoga kyunki yeh specifically lost items ke liye hai
});

export default mongoose.model("Lost", lostSchema);