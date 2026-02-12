<<<<<<< HEAD
// routes/historyroute.js - COMPLETE CODE
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
import express from "express";
import History from "../models/History.js";

const router = express.Router();

<<<<<<< HEAD
// ✅ GET ALL HISTORY (Frontend ke liye)
router.get("/", async (req, res) => {
  try {
    const allHistory = await History.find().sort({ createdAt: -1 });
    
    console.log(`📊 Found ${allHistory.length} history records`);

    res.json(allHistory); // ✅ Direct array bhejo frontend ko

  } catch (error) {
    console.error("❌ Error fetching history:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching history",
      error: error.message,
    });
  }
});

// ✅ GET USER SPECIFIC HISTORY
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userHistory = await History.find({ userId }).sort({ createdAt: -1 });

    res.json(userHistory); // ✅ Direct array

=======
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
    
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  } catch (error) {
    console.error("❌ Error fetching user history:", error);
    res.status(500).json({
      success: false,
<<<<<<< HEAD
      message: "Error fetching user history",
=======
      message: "Error fetching history",
      error: error.message,
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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