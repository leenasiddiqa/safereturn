import express from "express";
import Signup from "../models/signupp.js";

const router = express.Router();

//UPDATE ROUTE - save profile changes in signup database
router.put("/signups/:id", async (req, res) => {
  try {
    const { name, username, phone, address } = req.body;
    const userId = req.params.id;
    
    console.log("🔄 Updating profile in SIGNUP database for user:", userId);
    console.log("📝 Update data:", { name, username, phone, address });
    
    //  Directly update in Signup collection
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
//  DELETE ROUTE - Account permanently delete 
router.delete("/signups/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    
    console.log("🗑️ Deleting account from SIGNUP database for user:", userId);
    
    //  Directly delete from Signup collection
    const deletedUser = await Signup.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found in database"
      });
    }

    console.log("✅ Account permanently deleted for SAP ID:", deletedUser.sapid);
    
    res.json({
      success: true,
      message: "Account permanently deleted from system",
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