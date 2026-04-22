import express from "express";
import Donation from "../models/donation.js";
import Notification from "../models/notification.js";

const router = express.Router();

// ✅ Add new donation
router.post("/", async (req, res) => {
  try {
    const { userId, itemId, itemName, category, foundDate } = req.body;

    // Validate required fields
    if (!userId || !itemId || !itemName || !category || !foundDate) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check if donation already exists
    const existingDonation = await Donation.findOne({ itemId });
    if (existingDonation) {
      return res.status(200).json({ success: true, message: "Donation already exists", donation: existingDonation });
    }

    // Save donation
    const donation = new Donation({
      userId,
      itemId,
      itemName,
      category,
      foundDate,
      donatedOn: new Date(),
      status: "donated",
    });

    const savedDonation = await donation.save();

    // Send notification
    const newNotification = new Notification({
      userId,
      type: "donation",
      message: `Your found item "${itemName}" has been donated.`,
      status: "new",
      relatedItemId: savedDonation._id,
    });
    await newNotification.save();

    res.status(201).json({ success: true, donation: savedDonation });
  } catch (error) {
    console.error("❌ Error submitting donation:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Get all donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().sort({ donatedOn: -1 });
    res.status(200).json(donations);
  } catch (error) {
    console.error("❌ Error fetching donations:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
