import express from "express";
import FoundItem from "../models/found.js";
import History from "../models/History.js";

const router = express.Router();

// ✅ GET ALL FOUND ITEMS
router.get("/", async (req, res) => {
  try {
    const foundItems = await FoundItem.find().sort({ dateReported: -1 });
    res.json(foundItems);
  } catch (error) {
    console.error("❌ Error fetching found items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching found items",
      error: error.message,
    });
  }
});

// ✅ POST NEW FOUND ITEM
router.post("/", async (req, res) => {
  try {
    const { name, brand, category, description, location, isImportantDoc, hiddenHints, image } = req.body;

    // Create new found item
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
    });

    const savedItem = await newFound.save();

    // ✅ AUTOMATICALLY CREATE HISTORY ENTRY
    const historyEntry = new History({
      userId: "anonymous",
      itemId: savedItem._id,
      itemName: savedItem.name,
      category: savedItem.category,
      type: "found",
      action: "reported_found",
      status: "pending"
    });
    await historyEntry.save();
    console.log("✅ History entry created for found item:", savedItem._id);

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