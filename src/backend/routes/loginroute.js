import express from "express";
import Signup from "../models/signupp.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("🔐 Login attempt:", username);
 // ✅ ADMIN CREDENTIALS CHECK (Database check se PEHLE)
    if (username === "admin123" && password === "admin") {
      console.log("✅ Admin login successful");
      return res.json({ 
        success: true, 
        message: "Admin login successful!",
        user: {
          id: "admin001",
          username: "admin123",
          name: "Administrator",
          role: "admin"  // ✅ Important: role = "admin"
        }
      });
    }
   // ✅ Normal user check - COMPLETE DATA RETURN KARO
    const user = await Signup.findOne({ username, password });
    
    if (user) {
      console.log("✅ User login successful - SAP ID:", user.sapid);
      res.json({ 
        success: true, 
        message: "Login successful!",
        user: {
          id: user._id,
          sapid: user.sapid,      // ✅ SAP ID RETURN KARO
          username: user.username,
          name: user.name,        // ✅ NAME RETURN KARO
          cnic: user.cnic,        // ✅ CNIC RETURN KARO
          phone: user.phone,      // ✅ PHONE RETURN KARO
          role: "user"
        }
      });
    } else {
      console.log("❌ Invalid credentials");
      res.status(401).json({ 
        success: false, 
        message: "Invalid username or password" 
      });
    }
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
});


export default router;