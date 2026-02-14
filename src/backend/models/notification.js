import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: {
    type: String,
    enum: ["claim_approved", "claim_rejected", "match", "system", "donation"],
    required: true,
  },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["new", "read"],
    default: "new",
  },
  relatedItemId: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
