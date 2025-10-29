import express from "express";
import Claim from "../models/claim.js";

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
// NEW ROUTE ADD KARO: Claim update karna
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
    });

  } catch (error) {
    console.error("❌ Error updating claim:", error);
    res.status(500).json({
      success: false,
      message: "Error updating claim",
      error: error.message
    });
  }
});

export default router;