import mongoose from "mongoose";

const foundSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup', required: true },
  name: { type: String, required: true },
  brand: { type: String, default: "" },
  category: { type: String, default: "Other" },
  description: { type: String, default: "" },
  location: { type: String, required: true },
  isImportantDoc: { type: Boolean, default: false },
  notForDonation: { type: Boolean, default: false },
  hiddenHints: { type: String, default: "" },
  image: { type: String, default: "" },
   claimed: { type: Boolean, default: false }, 
  dateReported: { type: Date, default: Date.now },
  resolved: { type: Boolean, default: false },
});

export default mongoose.model("Found", foundSchema);