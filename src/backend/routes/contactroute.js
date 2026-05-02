import express from "express";
import Contact from "../models/contact.js";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "irtazamuhammad030@gmail.com",
    pass: "myat dekx pwch nzjz"
  },
   timeout: 10000,  // ✅ 10 seconds timeout
  socketTimeout: 10000
});

// ✅ User submit contact form
router.post("/", async (req, res) => {
  try {
    const { email, message } = req.body;
    
    if (!email || !message) {
      return res.status(400).json({ success: false, message: "Email and message are required" });
    }

    const newContact = new Contact({
      email: email.trim(),
      message: message.trim()
    });

    await newContact.save();
    
    res.status(201).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Admin get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Admin reply via email (ONLY email, no in-app notification)
// ✅ Admin reply via email (background send — fast)
router.post("/:id/reply", async (req, res) => {
  try {
    const { reply } = req.body;
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    
    // ✅ Update contact first (fast)
    contact.reply = reply;
    contact.status = "replied";
    contact.repliedAt = new Date();
    await contact.save();
    
    // ✅ Send email in background (NO await — doesn't wait)
    transporter.sendMail({
      to: contact.email,
      subject: "SafeReturn Support - Response to Your Query",
      text: `Dear User,\n\nThank you for contacting SafeReturn.\n\nYour Message: "${contact.message}"\n\nOur Response: ${reply}\n\nBest regards,\nSafeReturn Team`
    }).catch(err => console.error("Email send error:", err));
    
    // ✅ Immediate response to admin
    res.json({ success: true, message: "Reply sent successfully!" });
    
  } catch (error) {
    console.error("❌ Error sending reply:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});
// ✅ Admin delete contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;