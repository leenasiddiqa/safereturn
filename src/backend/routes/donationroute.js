import express from "express";
import Donation from "../models/donation.js";
<<<<<<< HEAD
import Notification from "../models/notification.js";
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

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

<<<<<<< HEAD
    // Send notification
    const newNotification = new Notification({
      userId,
      type: "donation",
      message: `Your found item "${itemName}" has been donated.`,
      status: "new",
      relatedItemId: savedDonation._id,
    });
    await newNotification.save();

=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
