import express from "express";
import Feedback from "../models/feedback.js";

const router = express.Router();

// save new feedback
router.post("/", async (req, res) => {
  try {
    const { email, message, rating } = req.body;
    
    console.log("📥 Received feedback data:", { email, message, rating });
    
    if (!email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and message are required" 
      });
    }
    
    const newFeedback = new Feedback({ 
      email: email.trim(), 
      message: message.trim(),
      rating: rating || 5
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

// get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error("❌ Error fetching feedback:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

//  Delete feedback for admin
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.json({ success: true, message: "Feedback deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;