import express from "express";
import LostItem from "../models/lost.js";
import History from "../models/History.js";

const router = express.Router();

// ✅ GET ALL LOST ITEMS
router.get("/", async (req, res) => {
  try {
    const { userId, all } = req.query;
    
    // Agar all=true hai to saare items, warna sirf specific user ke
    const query = (all === 'true') ? {} : (userId ? { userId: userId } : {});
    
    const lostItems = await LostItem.find(query).sort({ dateReported: -1 });
    res.json(lostItems);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ POST NEW LOST ITEM
router.post("/", async (req, res) => {
  try {
    const { userId, name, brand, category, description, location, hiddenHints, image, isImportantDoc  } = req.body;
 const existingItem = await LostItem.findOne({ 
      userId: userId,
      name: name,
      location: location 
    });
    
    if (existingItem) {
      return res.status(400).json({ 
        success: false, 
        message: "You have already reported this item" 
      });
    }
    // Create new lost item
    const newLost = new LostItem({
      userId, 
      name,
      brand,
      category,
      description,
      location,
      hiddenHints,
      image,
       isImportantDoc: isImportantDoc || false,
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
// ✅ UPDATE lost item (for resolved status)
router.put("/:id", async (req, res) => {
  try {
    const { resolved, status } = req.body;
    const updatedItem = await LostItem.findByIdAndUpdate(
      req.params.id,
      { resolved, status },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error("❌ Error updating lost item:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;