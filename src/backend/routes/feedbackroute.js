import express from "express";
import Feedback from "../models/feedback.js";

const router = express.Router();

// ✅ New feedback save karna
router.post("/", async (req, res) => {
  try {
    const { type, message } = req.body;
    
    console.log("📥 Received feedback data:", { type, message });

    if (!type || !message) {
      return res.status(400).json({
        success: false,
        message: "Type and message are required"
      });
    }

    const newFeedback = new Feedback({
      type: type.trim(),
      message: message.trim()
    });

    const savedFeedback = await newFeedback.save();
    
    console.log("✅ Feedback saved successfully:", savedFeedback._id);
    
    res.status(201).json({
      success: true,
      message: "Thank you for your feedback!",
      feedback: savedFeedback
    });
    
  } catch (error) {
    console.error("❌ Error saving feedback:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting feedback",
      error: error.message
    });
  }
});

// ✅ All feedback get karna (admin ke liye)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submissionDate: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("❌ Error fetching feedback:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;