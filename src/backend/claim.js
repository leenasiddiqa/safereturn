import mongoose from "mongoose";

const claimSchema = new mongoose.Schema({
  claimantName: { type: String, required: true },
  contact: { type: String, required: true },
  providedHints: { type: String, default: "" },
  itemId: { type: String, required: true },
  itemName: { type: String, required: true },
  itemBrand: { type: String, default: "Unknown" },
  itemCategory: { type: String, default: "Other" },
  itemLocation: { type: String, required: true },
  itemType: { type: String, enum: ["lost", "found"], required: true },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected", "auto-approved"], 
    default: "pending" 
  },
  claimDate: { type: Date, default: Date.now },
   userId: { type: String, required: true }
},{ timestamps: true });

export default mongoose.model("Claim", claimSchema);