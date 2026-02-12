import express from "express";
import FoundItem from "../models/found.js";
import History from "../models/History.js";

const router = express.Router();

<<<<<<< HEAD
// ✅ GET ALL FOUND ITEMS
router.get("/", async (req, res) => {
  try {
    const foundItems = await FoundItem.find().sort({ dateReported: -1 });
    res.json(foundItems);
  } catch (error) {
    console.error("❌ Error fetching found items:", error);
=======
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
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    res.status(500).json({
      success: false,
      message: "Error fetching found items",
      error: error.message,
    });
  }
});

<<<<<<< HEAD
// ✅ POST NEW FOUND ITEM
router.post("/", async (req, res) => {
  try {
    const { name, brand, category, description, location, isImportantDoc, hiddenHints, image } = req.body;

    // Create new found item
=======
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

>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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
<<<<<<< HEAD
=======
      userId: userId
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    });

    const savedItem = await newFound.save();

<<<<<<< HEAD
    // ✅ AUTOMATICALLY CREATE HISTORY ENTRY
    const historyEntry = new History({
      userId: "anonymous",
=======
    // History entry
    const historyEntry = new History({
      userId: userId,
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      itemId: savedItem._id,
      itemName: savedItem.name,
      category: savedItem.category,
      type: "found",
      action: "reported_found",
      status: "pending"
    });
    await historyEntry.save();
<<<<<<< HEAD
    console.log("✅ History entry created for found item:", savedItem._id);
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

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