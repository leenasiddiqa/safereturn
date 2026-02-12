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
<<<<<<< HEAD
      // Return existing notification instead of creating duplicate
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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

<<<<<<< HEAD
// ✅ Get all notifications
=======
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
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
