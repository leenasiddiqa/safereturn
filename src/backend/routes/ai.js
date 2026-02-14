import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// ✅ Initialize Gemini API
const genAI = new GoogleGenerativeAI("AIzaSyAgfz4hoqH-JlxzNq5od4vHKQRpgn7qSkA");

router.post("/describe", async (req, res) => {
  try {
    const { image } = req.body;
    
    if (!image) {
      return res.json({
        success: false,
        message: "No image provided"
      });
    }

    console.log("🤖 Analyzing image with Gemini Vision AI...");

    // Extract base64 data and mime type
    const base64Match = image.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!base64Match) {
      return res.json({
        success: false,
        message: "Invalid image format"
      });
    }

    const mimeType = `image/${base64Match[1]}`;
    const base64Data = base64Match[2];

    // ✅ NEWEST MODEL: Gemini 3 Flash Preview
   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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

    // ✅ Correct way to send image + prompt
    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    const result = await model.generateContent([imagePart, prompt]);
    const response = result.response;
    let text = response.text();
    
    console.log("✅ Gemini Response received");
    console.log("📝 Raw response:", text);

    // Clean response more aggressively
    text = text.trim();
    text = text.replace(/```json|```|JSON:|Response:/gi, '');
    text = text.trim();

    // Extract JSON using multiple methods
    let jsonText = '';
    if (text.startsWith('{') && text.endsWith('}')) {
      jsonText = text;
    } else {
      // Try to find JSON within text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonText = jsonMatch[0];
      } else {
        console.error("❌ No valid JSON found in response:", text);
        throw new Error("No valid JSON found in AI response");
      }
    }

    // Parse and validate
    const analysis = JSON.parse(jsonText);
    console.log("✅ Parsed analysis:", analysis);

    // FALLBACK: If name is generic, use category
    if (analysis.name === "Item" || analysis.name.toLowerCase() === "item" || analysis.name.length < 3) {
      analysis.name = analysis.category;
    }

    // Ensure category is from allowed list
    const allowedCategories = ["ID Card", "Book", "Wallet", "Stationery", "Electronics", "Other"];
    if (!allowedCategories.includes(analysis.category)) {
      analysis.category = "Other";
    }

    // Return all fields
    return res.json({
      success: true,
      name: analysis.name || "",
      brand: analysis.brand || "",
      category: analysis.category || "Other",
      description: analysis.description || "",
      hiddenHints: analysis.hiddenHints || "",
    });

  } catch (error) {
    console.error("❌ Gemini Error:", error.message);
    if (error.stack) {
      console.error("Stack:", error.stack);
    }
    
    // Fallback for error
    return res.json({
      success: true,
      name: "Item",
      brand: "",
      category: "Other",
      description: "Please describe the item manually: color, size, material, condition.",
      hiddenHints: "Add any serial numbers, unique marks, or identifying features.",
    });
  }
});

export default router;