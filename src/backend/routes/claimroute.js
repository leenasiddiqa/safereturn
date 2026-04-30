import express from "express";
import Claim from "../models/claim.js";
import FoundItem from "../models/found.js";
import LostItem from "../models/lost.js";

const router = express.Router();

// ✅ New claim create karna
router.post("/", async (req, res) => {
  try {
    const { itemId, claimantName, contact, providedHints, itemName, itemBrand, itemCategory, itemLocation, itemType, status } = req.body;
    
    console.log("📥 Received claim data:", req.body);

    if (!claimantName || !contact || !itemId) {
      return res.status(400).json({
        success: false,
        message: "Claimant name, contact, and item ID are required"
      });
    }
// ✅ Duplicate claim check
const existingClaim = await Claim.findOne({ 
  itemId: itemId,
  claimantName: claimantName,
  status: { $in: ["pending", "approved", "auto-approved"] }
});

if (existingClaim) {
  return res.status(400).json({ 
    success: false, 
    message: "You have already claimed this item. Please wait for admin approval." 
  });
}
    // ✅ Fetch item to get isImportantDoc
    const foundItem = await FoundItem.findById(itemId);
    const lostItem = await LostItem.findById(itemId);
    const item = foundItem || lostItem;

    const newClaim = new Claim({
      claimantName,
      contact,
      providedHints,
      itemId,
      itemName,
      itemBrand,
      itemCategory,
      itemLocation,
      itemType,
      isImportantDoc: item?.isImportantDoc || false,
      status: status || "pending"
    });

    const savedClaim = await newClaim.save();
    
    console.log("✅ Claim saved successfully:", savedClaim._id);
    
    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      claim: savedClaim
    });
    
  } catch (error) {
    console.error("❌ Error saving claim:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting claim",
      error: error.message
    });
  }
});

// ✅ All claims get karna (admin ke liye)
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find().sort({ claimDate: -1 });
    res.json(claims);
  } catch (error) {
    console.error("❌ Error fetching claims:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Claim update karna
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("📥 Updating claim:", id, "to status:", status);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found"
      });
    }

    claim.status = status;
    const updatedClaim = await claim.save();
   if (status === "approved") {
      let item = await FoundItem.findById(claim.itemId);
      if (!item) {
        item = await LostItem.findById(claim.itemId);
      }
      
      if (item) {
        item.claimed = true;
        await item.save();
        console.log("✅ Item claimed status updated:", item._id);
      }
    }

    // ✅ If rejected, delete claim so user can claim again
    if (status === "rejected") {
      await Claim.findByIdAndDelete(id);
      console.log("✅ Rejected claim deleted:", id);
    }

    console.log("✅ Claim updated successfully:", claim._id);

    res.json({
      success: true,
      message: "Claim status updated successfully",
      claim: claim
    });
  }
   catch (error) {
    console.error("❌ Error updating claim:", error);
    res.status(500).json({
      success: false,
      message: "Error updating claim",
      error: error.message
    });
  }
});

export default router;