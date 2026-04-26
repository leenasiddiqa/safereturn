import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import OTP from "../models/otp.js";
import Signup from "../models/signupp.js";

const router = express.Router();

// Email config (APNA EMAIL AUR PASSWORD DALO)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "irtazamuhammad030@gmail.com",    // ✅ APNA EMAIL DALO
    pass: "myat dekx pwch nzjz"        // ✅ APNA APP PASSWORD DALO
  }
});

// 📧 Send OTP for Signup
router.post("/send-signup-otp", async (req, res) => {
  console.log("📨 FULL REQUEST BODY:", req.body);
  
  const { email } = req.body;
console.log("📧 EMAIL VALUE:", email); 
  try {
    // Check karo email already exist to nahi karta
    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const otp = crypto.randomInt(100000, 999999).toString();

    await OTP.findOneAndUpdate(
      { email },
      { email, otp },
      { upsert: true, new: true }
    );

    await transporter.sendMail({
      from: "tumhara_email@gmail.com",
      to: email,
      subject: "Verify Your Email - OTP",
      text: `Your OTP for signup is: ${otp}\nIt will expire in 5 minutes.`
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// ✅ Verify OTP and complete signup
router.post("/verify-signup-otp", async (req, res) => {
  const { email, otp, username, password, name, cnic, phone } = req.body;

  try {
    const record = await OTP.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // OTP delete karo
    await OTP.deleteOne({ email });
const sapidValue = email.split('@')[0];
    // User create karo
    const newUser = new Signup({
       sapid: sapidValue,
      username,
      password,
      name,
      cnic,
      phone,
      email
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Account created successfully! Please login."
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});

export default router;