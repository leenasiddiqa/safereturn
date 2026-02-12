import express from "express";
import Notification from "../models/notification.js";

const router = express.Router();

// ✅ Create new notification (no duplicates)
router.post("/", async (req, res) => {
  try {
    const { userId, type, message, relatedItemId } = req.body;

    if (!userId || !message) {
      return res.status(400).json({ success: false, message: "User ID and message required" });
    }

    // ✅ Check if a similar notification already exists
    const existingNotification = await Notification.findOne({
      userId,
      type: type || "general",
      relatedItemId,
    });

    if (existingNotification) {
      return res.status(200).json({ success: true, notification: existingNotification });
    }

    // Create new notification if not exists
    const newNotification = new Notification({
      userId,
      type: type || "general",
      message,
      relatedItemId,
      status: "new",
    });

    const saved = await newNotification.save();
    res.status(201).json({ success: true, notification: saved });
  } catch (error) {
    console.error("❌ Error saving notification:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get USER'S notifications only
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required"
      });
    }

    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });
    res.json(notifications);
    
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
});

// ✅ Get all notifications (admin ke liye)
router.get("/all-notifications", async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Mark notification as read
router.put("/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { status: "read" },
      { new: true }
    );

    if (!notification) return res.status(404).json({ error: "Notification not found" });

    res.json({ success: true, notification });
  } catch (error) {
    console.error("❌ Error marking notification as read:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;