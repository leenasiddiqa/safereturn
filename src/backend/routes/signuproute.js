import express from "express";
import Signup from "../models/signupp.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { sapid, username, password, name, cnic, phone } = req.body;

  try {
    console.log("📝 Signup attempt for:", username);
    console.log("📦 Database:", "safereturn");
    
    // ✅ Check if SAP ID already exists
    const existingSapId = await Signup.findOne({ sapid: sapid });
    if (existingSapId) {
      return res.status(400).json({
        success: false,
        message: "SAP ID already registered"
      });
    }
    
    // ✅ Check if username already exists
    const existingUser = await Signup.findOne({ username });
    if (existingUser) {
      console.log("❌ Username exists in safereturn database");
      return res.status(400).json({ 
        success: false, 
        message: "Username already exists" 
      });
    }

    // ✅ Create and save new user - VARIABLE NAME CORRECT KARO
    const newUser = new Signup({ sapid, username, password, name, cnic, phone });
    const savedUser = await newUser.save(); // ✅ savedUser variable banaya

    console.log("✅ User saved to SAFERETURN database:", savedUser._id);

    res.json({ 
      success: true, 
      message: "Signup successful in SAFERETURN database!",
      user: {
        id: savedUser._id,
        sapid: savedUser.sapid, // ✅ savedUser use karo
        username: savedUser.username // ✅ savedUser use karo
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
// ✅ ADD THIS AT THE TOP OF YOUR signuproute.js
router.put("/signups/:id", async (req, res) => {
  console.log("🔄 PUT /signups/:id route HIT!");
  console.log("📝 Request params:", req.params);
  console.log("📦 Request body:", req.body);
  
  try {
    const { name, username, phone, address } = req.body;
    const userId = req.params.id;
    
    console.log("🔄 Updating SIGNUP collection for user ID:", userId);
    console.log("📝 Update data:", { name, username, phone, address });
    
    // ✅ Update in Signup collection
    const updatedUser = await Signup.findByIdAndUpdate(
      userId,
      {
        name: name,
        username: username,
        phone: phone,
        address: address
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      console.log("❌ User not found with ID:", userId);
      return res.status(404).json({
        success: false,
        message: "User not found in SIGNUP database"
      });
    }

    console.log("✅ SIGNUP collection updated for SAP ID:", updatedUser.sapid);
    
    res.json({
      success: true,
      message: "Profile updated successfully in SIGNUP database!",
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
// ✅ ADD TEST ROUTE
router.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ success: true, message: "Signup routes are working!" });
});
export default router;