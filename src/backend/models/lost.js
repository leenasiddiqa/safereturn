import mongoose from "mongoose";

const lostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup', required: true },
  name: { type: String, required: true },
  brand: { type: String, default: "" },
  category: { type: String, default: "Other" },
  description: { type: String, default: "" },
  location: { type: String, required: true },
  hiddenHints: { type: String, default: "" },
  image: { type: String, default: "" },
   isImportantDoc: { type: Boolean, default: false },
  dateReported: { type: Date, default: Date.now },
  status: { type: String, default: "active" },
  resolved: { type: Boolean, default: false },
  // type field nahi hoga kyunki yeh specifically lost items ke liye hai
});

export default mongoose.model("Lost", lostSchema);