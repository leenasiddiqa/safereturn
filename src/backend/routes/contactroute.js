import express from "express";
import Contact from "../models/contact.js";

const router = express.Router();

// New contact message 
router.post("/", async (req, res) => {
  try {
    const { email, message } = req.body;
    
    console.log("📥 Received contact form data:", { email, message });

    if (!email || !message) {
      return res.status(400).json({
        success: false,
        message: "Email and message are required"
      });
    }

    const newContact = new Contact({
      email: email.trim(),
      message: message.trim()
    });

    const savedContact = await newContact.save();
    
    console.log("✅ Contact message saved successfully:", savedContact._id);
    
    res.status(201).json({
      success: true,
      message: "Message sent successfully! We'll get back to you soon.",
      contact: savedContact
    });
    
  } catch (error) {
    console.error("❌ Error saving contact message:", error);
    res.status(500).json({
      success: false,
      message: "Error sending message",
      error: error.message
    });
  }
});

// get all contact messages for admin
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ contactDate: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("❌ Error fetching contact messages:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;