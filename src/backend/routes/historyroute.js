// routes/historyroute.js - COMPLETE CODE
import express from "express";
import History from "../models/History.js";

const router = express.Router();

// ✅ GET ALL HISTORY (Frontend ke liye)
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId required" });
    }
    
    const userHistory = await History.find({ userId: userId }).sort({ createdAt: -1 });
    res.json(userHistory);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ GET USER SPECIFIC HISTORY
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userHistory = await History.find({ userId }).sort({ createdAt: -1 });

    res.json(userHistory); // ✅ Direct array

  } catch (error) {
    console.error("❌ Error fetching user history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user history",
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