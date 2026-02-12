// models/donation.js - Ye model create karo agar nahi hai
import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  itemId: {
    type: String,
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  foundDate: {
    type: Date,
    required: true
  },
  donatedOn: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: "donated"
  }
}, {
  timestamps: true
});

export default mongoose.model("Donation", donationSchema);