import express from "express";
import FoundItem from "../models/found.js";
import History from "../models/History.js";

const router = express.Router();

// ✅ GET FOUND ITEMS - ADMIN KE LIYE SAB, USER KE LIYE SPECIFIC
router.get("/", async (req, res) => {
  try {
    const { userId, admin } = req.query;
    
    // ✅ ADMIN KE LIYE SAB FOUND ITEMS
    if (admin === 'true') {
      const foundItems = await FoundItem.find().sort({ dateReported: -1 });
      return res.json(foundItems);
    }

    // ✅ USER SPECIFIC ITEMS
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required"
      });
    }

    const foundItems = await FoundItem.find({ userId }).sort({ dateReported: -1 });
    res.json(foundItems);
    
  } catch (error) {
    console.error("❌ Error fetching user found items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching found items",
      error: error.message,
    });
  }
});

// ✅ POST NEW FOUND ITEM WITH USER ID (EXISTING - NO CHANGE)
router.post("/", async (req, res) => {
  try {
    const { name, brand, category, description, location, isImportantDoc, hiddenHints, image, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

    const newFound = new FoundItem({
      name,
      brand,
      category,
      description,
      location,
      isImportantDoc: isImportantDoc || false,
      hiddenHints,
      image,
      claimed: false,
      status: "active",
      dateReported: new Date(),
      userId: userId
    });

    const savedItem = await newFound.save();

    // History entry
    const historyEntry = new History({
      userId: userId,
      itemId: savedItem._id,
      itemName: savedItem.name,
      category: savedItem.category,
      type: "found",
      action: "reported_found",
      status: "pending"
    });
    await historyEntry.save();

    res.status(201).json({
      success: true,
      message: "Found item reported successfully",
      item: savedItem,
    });

  } catch (error) {
    console.error("❌ Error reporting found item:", error);
    res.status(500).json({
      success: false,
      message: "Error reporting found item",
      error: error.message,
    });
  }
});

export default router;