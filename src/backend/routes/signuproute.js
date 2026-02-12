import express from "express";
import Signup from "../models/signupp.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { sapid, username, password, name, cnic, phone } = req.body;

  try {
    console.log("📝 Signup attempt for:", username);
<<<<<<< HEAD
    console.log("📦 Database:", "safereturn");
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    
    // ✅ Check if SAP ID already exists
    const existingSapId = await Signup.findOne({ sapid: sapid });
    if (existingSapId) {
      return res.status(400).json({
        success: false,
<<<<<<< HEAD
        message: "SAP ID already registered"
=======
        message: "SAP ID already registers"
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      });
    }
    
    // ✅ Check if username already exists
    const existingUser = await Signup.findOne({ username });
    if (existingUser) {
<<<<<<< HEAD
      console.log("❌ Username exists in safereturn database");
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      return res.status(400).json({ 
        success: false, 
        message: "Username already exists" 
      });
    }

<<<<<<< HEAD
    // ✅ Create and save new user - VARIABLE NAME CORRECT KARO
    const newUser = new Signup({ sapid, username, password, name, cnic, phone });
    const savedUser = await newUser.save(); // ✅ savedUser variable banaya
=======
    // ✅ Create and save new user
    const newUser = new Signup({ sapid, username, password, name, cnic, phone });
    const savedUser = await newUser.save();
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

    console.log("✅ User saved to SAFERETURN database:", savedUser._id);

    res.json({ 
      success: true, 
      message: "Signup successful in SAFERETURN database!",
      user: {
        id: savedUser._id,
<<<<<<< HEAD
        sapid: savedUser.sapid, // ✅ savedUser use karo
        username: savedUser.username // ✅ savedUser use karo
=======
        sapid: savedUser.sapid,
        username: savedUser.username,
        name: savedUser.name,
        role: "user" // ✅ Role add karo
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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
<<<<<<< HEAD
// ✅ ADD THIS AT THE TOP OF YOUR signuproute.js
router.put("/signups/:id", async (req, res) => {
  console.log("🔄 PUT /signups/:id route HIT!");
  console.log("📝 Request params:", req.params);
  console.log("📦 Request body:", req.body);
  
=======

// ✅ USER PROFILE UPDATE
router.put("/:id", async (req, res) => {
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  try {
    const { name, username, phone, address } = req.body;
    const userId = req.params.id;
    
<<<<<<< HEAD
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
=======
    const updatedUser = await Signup.findByIdAndUpdate(
      userId,
      { name, username, phone, address },
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      { new: true }
    ).select("-password");

    if (!updatedUser) {
<<<<<<< HEAD
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
=======
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully!",
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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
<<<<<<< HEAD
// ✅ ADD TEST ROUTE
router.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ success: true, message: "Signup routes are working!" });
});
=======

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

>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
export default router;