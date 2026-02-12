import express from "express";
import Signup from "../models/signupp.js";

const router = express.Router();

// ✅ SIRF UPDATE ROUTE - Profile changes save karo signup database mein
router.put("/signups/:id", async (req, res) => {
  try {
    const { name, username, phone, address } = req.body;
    const userId = req.params.id;
    
    console.log("🔄 Updating profile in SIGNUP database for user:", userId);
    console.log("📝 Update data:", { name, username, phone, address });
    
    // ✅ Directly update in Signup collection
    const updatedUser = await Signup.findByIdAndUpdate(
      userId,
      {
        name: name,
        username: username,
        phone: phone,
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in database"
      });
    }

    console.log("✅ Profile updated in SIGNUP database for SAP ID:", updatedUser.sapid);
    
    res.json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser
    });
    
  } catch (error) {
    console.error("❌ Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message
    });
  }
});
// ✅ DELETE by SAP ID instead of Mongo _id
router.delete("/signups/sap/:sapid", async (req, res) => {
  try {
    const sapid = req.params.sapid;

    console.log("🗑️ Deleting account for SAP ID:", sapid);

    const deletedUser = await Signup.findOneAndDelete({ sapid: sapid });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with this SAP ID"
      });
    }

    console.log("✅ Account permanently deleted for SAP ID:", deletedUser.sapid);

    res.json({
      success: true,
      message: "Account deleted successfully using SAP ID",
      deletedUser: {
        sapid: deletedUser.sapid,
        name: deletedUser.name
      }
    });
  } catch (error) {
    console.error("❌ Delete account error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during deletion: " + error.message
    });
  }
});


export default router;