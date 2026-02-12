import express from "express";
import LostItem from "../models/lost.js";
import History from "../models/History.js";

const router = express.Router();

<<<<<<< HEAD
// ✅ GET ALL LOST ITEMS
router.get("/", async (req, res) => {
  try {
    const lostItems = await LostItem.find().sort({ dateReported: -1 });
    res.json(lostItems);
=======
// ✅ GET USER'S LOST ITEMS ONLY
// ✅ GET LOST ITEMS
router.get("/", async (req, res) => {
  try {
    const { userId, admin } = req.query;

    let lostItems;

    // ✅ If admin=true → return ALL lost items
    if (admin === "true") {
      lostItems = await LostItem.find().sort({ dateReported: -1 });
    } 
    // ✅ Else if userId provided → return user's lost items
    else if (userId) {
      lostItems = await LostItem.find({ userId }).sort({ dateReported: -1 });
    } 
    // ❌ Missing both → invalid request
    else {
      return res.status(400).json({
        success: false,
        message: "User ID or admin flag required"
      });
    }

    res.json(lostItems);

>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  } catch (error) {
    console.error("❌ Error fetching lost items:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching lost items",
      error: error.message,
    });
  }
});

<<<<<<< HEAD
// ✅ POST NEW LOST ITEM
router.post("/", async (req, res) => {
  try {
    const { name, brand, category, description, location, hiddenHints, image } = req.body;

    // Create new lost item
=======

// ✅ POST NEW LOST ITEM WITH USER ID
router.post("/", async (req, res) => {
  try {
    const { name, brand, category, description, location, hiddenHints, image, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
      });
    }

>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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
<<<<<<< HEAD
=======
      userId: userId
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    });

    const savedItem = await newLost.save();

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
      type: "lost",
      action: "reported_lost",
      status: "pending"
    });
    await historyEntry.save();
<<<<<<< HEAD
    console.log("✅ History entry created for lost item:", savedItem._id);
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

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