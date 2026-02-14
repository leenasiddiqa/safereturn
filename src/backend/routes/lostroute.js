import express from "express";
import LostItem from "../models/lost.js";
import History from "../models/History.js";

const router = express.Router();

// ✅ GET ALL LOST ITEMS
router.get("/", async (req, res) => {
  try {
    const lostItems = await LostItem.find().sort({ dateReported: -1 });
    res.json(lostItems);
  } catch (error) {
    console.error("❌ Error fetching lost items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lost items",
      error: error.message,
    });
  }
});

// ✅ POST NEW LOST ITEM
router.post("/", async (req, res) => {
  try {
    const { name, brand, category, description, location, hiddenHints, image } = req.body;

    // Create new lost item
    const newLost = new LostItem({
      name,
      brand,
      category,
      description,
      location,
      hiddenHints,
      image,
      status: "active",
      dateReported: new Date(),
    });

    const savedItem = await newLost.save();

    // ✅ AUTOMATICALLY CREATE HISTORY ENTRY
    const historyEntry = new History({
      userId: "anonymous",
      itemId: savedItem._id,
      itemName: savedItem.name,
      category: savedItem.category,
      type: "lost",
      action: "reported_lost",
      status: "pending"
    });
    await historyEntry.save();
    console.log("✅ History entry created for lost item:", savedItem._id);

    res.status(201).json({
      success: true,
      message: "Lost item reported successfully",
      item: savedItem,
    });

  } catch (error) {
    console.error("❌ Error reporting lost item:", error);
    res.status(500).json({
      success: false,
      message: "Error reporting lost item",
      error: error.message,
    });
  }
});

export default router;