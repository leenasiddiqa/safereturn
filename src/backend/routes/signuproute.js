import express from "express";
import Signup from "../models/signupp.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { sapid, username, password, name, cnic, phone } = req.body;

  try {
    console.log("📝 Signup attempt for:", username);
    
    // ✅ Check if SAP ID already exists
    const existingSapId = await Signup.findOne({ sapid: sapid });
    if (existingSapId) {
      return res.status(400).json({
        success: false,
        message: "SAP ID already registers"
      });
    }
    
    // ✅ Check if username already exists
    const existingUser = await Signup.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: "Username already exists" 
      });
    }

    // ✅ Create and save new user
    const newUser = new Signup({ sapid, username, password, name, cnic, phone });
    const savedUser = await newUser.save();

    console.log("✅ User saved to SAFERETURN database:", savedUser._id);

    res.json({ 
      success: true, 
      message: "Signup successful in SAFERETURN database!",
      user: {
        id: savedUser._id,
        sapid: savedUser.sapid,
        username: savedUser.username,
        name: savedUser.name,
        role: "user" // ✅ Role add karo
      }
    });

  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error: " + error.message 
    });
  }
});

// ✅ USER PROFILE UPDATE
router.put("/:id", async (req, res) => {
  try {
    const { name, username, phone, address } = req.body;
    const userId = req.params.id;
    
    const updatedUser = await Signup.findByIdAndUpdate(
      userId,
      { name, username, phone, address },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

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

// ✅ GET USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const user = await Signup.findById(req.params.id).select("-password");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user: user
    });
    
  } catch (error) {
    console.error("❌ Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message
    });
  }
});
// ✅ Delete user by SAP ID
router.delete("/sap/:sapid", async (req, res) => {
  try {
    const deletedUser = await Signup.findOneAndDelete({ sapid: req.params.sapid });
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;