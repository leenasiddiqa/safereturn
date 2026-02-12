import express from "express";
import Claim from "../models/claim.js";
<<<<<<< HEAD

const router = express.Router();

// ✅ New claim create karna
router.post("/", async (req, res) => {
  try {
    const { 
      claimantName, 
      contact, 
      providedHints, 
      itemId, 
      itemName, 
      itemBrand, 
      itemCategory, 
      itemLocation, 
      itemType,
      status 
    } = req.body;
    
    console.log("📥 Received claim data:", req.body);

    if (!claimantName || !contact || !itemId) {
      return res.status(400).json({
        success: false,
        message: "Claimant name, contact, and item ID are required"
=======
import History from "../models/History.js";
import FoundItem from "../models/found.js"; 
import Notification from "../models/Notification.js"; 

const router = express.Router();

// ✅ GET CLAIMS
router.get("/", async (req, res) => {
  try {
    const { userId, admin } = req.query;

    
    if (admin === 'true') {
      const claims = await Claim.find().sort({ claimDate: -1 });
      return res.json(claims);
    }

    // ✅ USER SPECIFIC CLAIMS
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required"
      });
    }

    const claims = await Claim.find({ userId }).sort({ claimDate: -1 });
    res.json(claims);

  } catch (error) {
    console.error("❌ Error fetching claims:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching claims",
      error: error.message,
    });
  }
});

// ✅ POST NEW CLAIM WITH USER ID
router.post("/", async (req, res) => {
  try {
    const { 
      claimantName, contact, providedHints, itemId, itemName, 
      itemBrand, itemCategory, itemLocation, itemType, status, userId 
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required"
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      });
    }

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
<<<<<<< HEAD
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
=======
      status: status || "pending",
      claimDate: new Date(),
      userId: userId
    });

    const savedClaim = await newClaim.save();

    // ✅ History entry
    const historyEntry = new History({
      userId: userId,
      itemId: savedClaim.itemId,
      itemName: savedClaim.itemName,
      category: savedClaim.itemCategory,
      type: "claim",
      action: "submitted_claim",
      status: savedClaim.status
    });
    await historyEntry.save();

    res.status(201).json({
      success: true,
      message: "Claim submitted successfully",
      claim: savedClaim,
    });

  } catch (error) {
    console.error("❌ Error submitting claim:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting claim",
      error: error.message,
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    });
  }
});

<<<<<<< HEAD
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
// NEW ROUTE ADD KARO: Claim update karna
=======
// ✅ UPDATE CLAIM STATUS (ADMIN)
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

<<<<<<< HEAD
    console.log("📥 Updating claim:", id, "to status:", status);

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required"
      });
    }

    // Check if claim exists
    const claim = await Claim.findById(id);
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found"
      });
    }

    // Update claim status
    claim.status = status;
    const updatedClaim = await claim.save();

    console.log("✅ Claim updated successfully:", updatedClaim._id);

    res.json({
      success: true,
      message: "Claim status updated successfully",
      claim: updatedClaim
=======
    const updatedClaim = await Claim.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedClaim) {
      return res.status(404).json({
        success: false,
        message: "Claim not found",
      });
    }

    
    if (status === "approved") {
      const foundItem = await FoundItem.findById(updatedClaim.itemId);
      if (foundItem) {
        foundItem.claimed = true;
        foundItem.status = "claimed";
        await foundItem.save();
      }

    
      await History.findOneAndUpdate(
        { itemId: updatedClaim.itemId, type: "found" },
        { status: "claimed", action: "item_claimed" },
        { new: true }
      );
    }

    if (status === "rejected") {
      await History.findOneAndUpdate(
        { itemId: updatedClaim.itemId, type: "claim" },
        { status: "rejected" },
        { new: true }
      );
    }

    // ✅ CREATE NOTIFICATION FOR USER
    if (updatedClaim) {
      let messageText = "";

      if (status === "approved") {
        messageText = `Your claim for item "${updatedClaim.itemName}" has been approved.Collect your item from SSD .`;
      } else if (status === "rejected") {
        messageText = `Your claim for item "${updatedClaim.itemName}" has been rejected.`;
      }

      if (messageText) {
        const notification = new Notification({
          userId: updatedClaim.userId,
          type: status === "approved" ? "claim_approved" : "claim_rejected",
          message: messageText,
          relatedItemId: updatedClaim.itemId,
        });

        await notification.save();
      }
    }

    res.json({
      success: true,
      message: "Claim updated successfully",
      claim: updatedClaim,
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    });

  } catch (error) {
    console.error("❌ Error updating claim:", error);
    res.status(500).json({
      success: false,
      message: "Error updating claim",
<<<<<<< HEAD
      error: error.message
=======
      error: error.message,
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    });
  }
});

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
