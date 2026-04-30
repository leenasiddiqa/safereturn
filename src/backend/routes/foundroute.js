import express from "express";
import FoundItem from "../models/found.js";
import History from "../models/History.js";

const router = express.Router();

// ✅ GET ALL FOUND ITEMS
router.get("/", async (req, res) => {
  try {
    const { userId, all } = req.query;
    // Agar all=true hai to saare items, warna sirf specific user ke
    const query = (all === 'true') ? {} : (userId ? { userId: userId } : {});
    const finalQuery = (all === 'true') ? query : { ...query, claimed: false };
    const foundItems = await FoundItem.find(all === 'true' ? query : finalQuery).sort({ dateReported: -1 });
    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ POST NEW FOUND ITEM
router.post("/", async (req, res) => {
  try {
    const {userId, name, brand, category, description, location, isImportantDoc, hiddenHints, image } = req.body;
console.log("📝 isImportantDoc received:", isImportantDoc);  // ✅ Debug
const isImportant = isImportantDoc === true || isImportantDoc === "true";
    // Create new found item
    const newFound = new FoundItem({
      userId,
      name,
      brand,
      category,
      description,
      location,
       isImportantDoc: Boolean(isImportant),
      hiddenHints,
      image,
      claimed: false,
      status: "active",
      dateReported: new Date(),
    });

    const savedItem = await newFound.save();

    // ✅ AUTOMATICALLY CREATE HISTORY ENTRY
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
// ✅ UPDATE found item (for resolved status)
router.put("/:id", async (req, res) => {
  try {
    const { resolved, status } = req.body;
    const updatedItem = await FoundItem.findByIdAndUpdate(
      req.params.id,
      { resolved, status },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }
    res.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error("❌ Error updating found item:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
export default router;