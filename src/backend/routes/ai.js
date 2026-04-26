import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log("🤖 Gemini:", process.env.GEMINI_API_KEY ? "✅ Key loaded" : "❌ Key missing");

router.post("/describe", async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.json({ success: false, message: "No image provided" });
    }

    console.log("🤖 Analyzing image...");

    const base64Match = image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      return res.json({ success: false, message: "Invalid image format" });
    }

    const mimeType = `image/${base64Match[1]}`;
    const base64Data = base64Match[2];
   const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash-lite",
  generationConfig: {
    temperature: 0,
    topP: 0.95,
    topK: 40,
  }
});

   

const prompt = `Analyze this lost/found item image CAREFULLY.

**CRITICAL:** First identify EXACTLY what the item is:
- **Wallet**: If it holds cards/money
- **Phone**: If it's a mobile device  
- **Keys**: If they are keys
- **ID Card**: If it's an identity document
- **Book**: If it's a book or notebook
- **Stationery**: Pens, pencils, notebooks
- **Electronics**: Phones, chargers, headphones
- **Other**: If none of above

**Return ONLY this JSON (NO other text):**
{
  "name": "EXACT ITEM NAME (e.g., 'Leather Wallet', 'iPhone 12', 'Car Keys')",
  "brand": "Brand if visible (e.g., 'Apple', 'Samsung', 'Nike') or empty string",
  "category": "EXACTLY ONE: ID Card, Book, Wallet, Stationery, Electronics, or Other",
  "description": "Detailed description: color, size, material, condition, features. 50-100 words.",
  "hiddenHints": "Serial numbers, scratches, stickers, engravings, or unique marks"
}

**GUIDELINES:**
- If unsure about category, choose "Other"
- Be specific: "Brown Leather Wallet with 6 card slots" not just "Wallet"
- Mention ALL visible text/logos
- Note any damage/wear`;


    const imagePart = { inlineData: { data: base64Data, mimeType: mimeType } };
    const result = await model.generateContent([imagePart, prompt]);
    const response = result.response;
    let text = response.text();
    
    text = text.trim().replace(/```json|```|JSON:|Response:/gi, '').trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text);

    return res.json({
      success: true,
      name: analysis.name || "Item",
      brand: analysis.brand || "",
      category: analysis.category || "Other",
      description: analysis.description || "",
      hiddenHints: analysis.hiddenHints || "",
    });

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    return res.json({
      success: true,
      name: "Item",
      brand: "",
      category: "Other",
      description: "Please describe the item manually",
      hiddenHints: "",
    });
  }
});

export default router;