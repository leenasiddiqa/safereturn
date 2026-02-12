import express from "express";
import History from "../models/History.js";

const router = express.Router();

// ✅ GET USER'S HISTORY ONLY
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required"
      });
    }

    const userHistory = await History.find({ userId }).sort({ createdAt: -1 });
    res.json(userHistory);
    
  } catch (error) {
    console.error("❌ Error fetching user history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching history",
      error: error.message,
    });
  }
});

// ✅ ADD TO HISTORY
router.post("/", async (req, res) => {
  try {
    const { userId, itemId, itemName, category, type, action } = req.body;

    const newHistory = new History({
      userId,
      itemId,
      itemName,
      category,
      type,
      action
    });

    const savedHistory = await newHistory.save();

    res.status(201).json({
      success: true,
      message: "Added to history",
      history: savedHistory,
    });

  } catch (error) {
    console.error("❌ Error adding to history:", error);
    res.status(500).json({
      success: false,
      message: "Error adding to history",
    });
  }
});

export default router;