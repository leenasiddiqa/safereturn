import express from "express";
import Signup from "../models/signupp.js";

const router = express.Router();

// ✅ Email validation function
const isValidRiphahEmail = (email) => {
  // Regex for sapid@students.riphah.edu.pk
  const riphahEmailRegex = /^\d+@students\.riphah\.edu\.pk$/;
  return riphahEmailRegex.test(email);
};
// Add this at the top with other routes
router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await Signup.findOne({ username: email });
    res.json({ exists: !!existingUser });
  } catch (error) {
    res.json({ exists: false });
  }
});
// ✅ POST route - Signup with email validation
router.post("/", async (req, res) => {
  const { sapid, username, password, name, phone } = req.body;

  try {
    console.log("📝 Signup attempt for:", username);
    console.log("📦 Database:", "safereturn");
    
    // ✅ CHECK 1: Email validation - Sirf Riphah email allowed
    if (!isValidRiphahEmail(username)) {
      console.log("❌ Invalid email format:", username);
      return res.status(400).json({
        success: false,
        message: "Only Riphah university email allowed (sapid@students.riphah.edu.pk)"
      });
    }
    
    // ✅ CHECK 2: SAP ID format validation (sapid email se match karna chahiye)
    const emailSapid = username.split('@')[0]; // Email se sapid nikalna
    if (emailSapid !== sapid) {
      console.log("❌ SAP ID mismatch:", { emailSapid, sapid });
      return res.status(400).json({
        success: false,
        message: "SAP ID must match with email SAP ID"
      });
    }
    // ✅ CHECK 2.5: SAP ID format validation (NEW)
    const sapidFormatRegex = /^(?:f\d{5}|\d{5})$/;
    if (!sapidFormatRegex.test(sapid)) {
      return res.status(400).json({
        success: false,
        message: "SAP ID must be 5 digits (e.g., 46416) OR 'f' followed by 5 digits (e.g., f12345)"
      });
    }
    // ✅ CHECK 3: Check if SAP ID already exists
    const existingSapId = await Signup.findOne({ sapid: sapid });
    if (existingSapId) {
      return res.status(400).json({
        success: false,
        message: "SAP ID already registered"
      });
    }
    
    // ✅ CHECK 4: Check if username/email already exists
    const existingUser = await Signup.findOne({ username });
    if (existingUser) {
      console.log("❌ Username exists in safereturn database");
      return res.status(400).json({ 
        success: false, 
        message: "Email already registered" 
      });
    }

    // ✅ Create and save new user
    const newUser = new Signup({ sapid, username, password, name, phone });
    const savedUser = await newUser.save();

    console.log("✅ User saved to SAFERETURN database:", savedUser._id);

    res.json({ 
      success: true, 
      message: "Signup successful in SAFERETURN database!",
      user: {
        id: savedUser._id,
        sapid: savedUser.sapid,
        username: savedUser.username
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

// ✅ PUT route - Update profile
router.put("/:id", async (req, res) => {
  console.log("🔄 PUT /:id route HIT!");
  console.log("📝 Request params:", req.params);
  console.log("📦 Request body:", req.body);
  
  try {
    const { name, username, phone } = req.body;
    const userId = req.params.id;
    
    // ✅ If email is being updated, validate it
    if (username && !isValidRiphahEmail(username)) {
      return res.status(400).json({
        success: false,
        message: "Only Riphah university email allowed (sapid@students.riphah.edu.pk)"
      });
    }
    
    console.log("🔄 Updating SIGNUP collection for user ID:", userId);
    console.log("📝 Update data:", { name, username, phone });
    
    const updatedUser = await Signup.findByIdAndUpdate(
      userId,
      { name, username, phone },
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

// ✅ DELETE route - Delete account
router.delete("/:id", async (req, res) => {
  console.log("🗑️ DELETE /:id route HIT!");
  console.log("📝 Request params:", req.params);
  
  try {
    const userId = req.params.id;
    
    console.log("🗑️ Deleting user from SIGNUP collection with ID:", userId);
    
    const deletedUser = await Signup.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      console.log("❌ User not found with ID:", userId);
      return res.status(404).json({
        success: false,
        message: "User not found in SIGNUP database"
      });
    }
    
    console.log("✅ User deleted successfully:", deletedUser.sapid);
    
    res.json({
      success: true,
      message: "Account deleted successfully!",
      user: {
        id: deletedUser._id,
        sapid: deletedUser.sapid,
        username: deletedUser.username
      }
    });
    
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Server error: " + error.message
    });
  }
});

// ✅ TEST ROUTE
router.get("/test", (req, res) => {
  console.log("✅ Test route hit!");
  res.json({ success: true, message: "Signup routes are working!" });
});

export default router;