import React, { useRef, useState } from "react";

export default function ItemForm({ form, setForm, onSubmit, mode = "lost" }) {
  const fileInput = useRef();
  const [touched, setTouched] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ AI IMAGE ANALYSIS - FILLS ALL FIELDS
  async function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large! Please select an image under 5MB.");
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert("Please select a valid image file (JPEG, PNG, etc.)");
      return;
    }

    // Image preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, image: ev.target.result }));
    };
    reader.readAsDataURL(file);

    try {
      setAiLoading(true);
      setForm((f) => ({ 
        ...f, 
        name: "🤖 AI Analyzing...",
        description: "🤖 AI is analyzing your image to extract all details..." 
      }));

      // Get AI analysis from backend
      const analysis = await getAIAnalysis(file);
      
      // Update ALL form fields with AI results
      setForm((f) => ({
        ...f,
        name: analysis.name || "",
        brand: analysis.brand || "",
        category: analysis.category || "Other",
        description: analysis.description || "",
        hiddenHints: analysis.hiddenHints || "",
      }));
      
      console.log("✅ All fields auto-filled!", analysis);
      
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI analysis failed. Please fill manually.");
      setForm((f) => ({ 
        ...f, 
        name: "",
        description: "Please describe what you see in the image..." 
      }));
    } finally {
      setAiLoading(false);
    }
  }

  // ✅ CALL BACKEND AI API
  async function getAIAnalysis(file) {
    try {
      // Convert file to base64
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });

      console.log("📤 Sending image to AI backend...");

      // Call your existing backend
      const response = await fetch('http://localhost:5000/api/ai/describe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      console.log('📥 AI Response:', data);

      if (!data.success) {
        throw new Error(data.message || 'AI analysis failed');
      }

      // Return all fields
      return {
        name: data.name || "",
        brand: data.brand || "",
        category: data.category || "Other",
        description: data.description || "",
        hiddenHints: data.hiddenHints || "",
      };

    } catch (error) {
      console.error("Backend API Error:", error);
      throw error;
    }
  }

  // Rest of your existing functions...
  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === "name" || name === "brand") {
      const filteredValue = value.replace(/[^a-zA-Z\s\-.,]/g, '');
      setForm((f) => ({ ...f, [name]: filteredValue }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  // Function to validate form (for parent component)
  const validateForm = () => {
    setShowErrors(true);
    return form.name && form.name.trim().length >= 10 &&
           form.brand && form.brand.trim().length >= 2 &&
           form.category &&
           form.location && form.location.trim().length >= 5 &&
           form.description && form.description.trim().length >= 15;
  };

  // ✅ COMPREHENSIVE VALIDATION FUNCTIONS (only show after submit attempt)
  const nameError = 
    showErrors && (!form.name || form.name.trim().length < 10)
      ? "Item name must be at least 10-15 characters" 
      : "";

  const brandError = 
    showErrors && (!form.brand || form.brand.trim().length < 2)
      ? "Brand name must be at least 2 characters" 
      : "";

  const categoryError = 
    showErrors && !form.category
      ? "Please select a category" 
      : "";

  const locationError = 
    showErrors && (!form.location || form.location.trim().length < 5)
      ? "Location must be at least 5 characters" 
      : "";

  const descriptionError = 
    showErrors && (!form.description || form.description.trim().length < 15)
      ? "Description must be at least 15 characters" 
      : "";

  const hiddenHintsError = 
    showErrors && form.hiddenHints && form.hiddenHints.length > 300 
      ? "Hidden hints cannot exceed 300 characters" 
      : "";

  return (
    <>
      <div className="form-two-column">
        {/* Left Column */}
        <div className="left-column">
          <label>
            Item Name *
            {aiLoading && <span style={{color: '#667eea', marginLeft: '8px', fontSize: '0.85em'}}>
              🤖 AI filling...
            </span>}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              minLength={2}
              maxLength={15}
              placeholder="AI will auto-fill from image"
              disabled={aiLoading}
            />
            {nameError && <span className="notice error">{nameError}</span>}
          </label>

          <label>
            Brand 
            {aiLoading && <span style={{color: '#667eea', marginLeft: '8px', fontSize: '0.85em'}}>
              🤖 AI detecting...
            </span>}
            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={15}
              placeholder="AI will detect brand"
              disabled={aiLoading}
            />
            {brandError && <span className="notice error">{brandError}</span>}
          </label>

          <label>
            Category *
            {aiLoading && <span style={{color: '#667eea', marginLeft: '8px', fontSize: '0.85em'}}>
              🤖 AI selecting...
            </span>}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={aiLoading}
            >
              {[
                "ID Card",
                "Book",
                "Wallet",
                "Stationery", 
                "Electronics",
                "Other",
              ].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {categoryError && <span className="notice error">{categoryError}</span>}
          </label>

          <label>
            {mode === "lost" ? "Last seen location *" : "Found location *"}
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              minLength={5}
              maxLength={100}
              placeholder="Where was it last seen/found? (minimum 5 characters)"
            />
            {locationError && <span className="notice error">{locationError}</span>}
          </label>

          <label className="inline">
            <input
              type="checkbox"
              name="isImportantDoc"
              checked={form.isImportantDoc || false}
              onChange={(e) =>
                setForm((f) => ({ ...f, isImportantDoc: e.target.checked }))
              }
            />{" "}
            Important document (IDs, CNIC, Passport, etc.)
          </label>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <label>
            Description 
            {aiLoading && <span style={{color: '#667eea', marginLeft: '8px', fontSize: '0.85em'}}>
              🤖 AI analyzing...
            </span>}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              minLength={2}
              maxLength={500}
              placeholder={aiLoading ? "AI is analyzing your image..." : "AI will auto-generate detailed description"}
              disabled={aiLoading}
            />
            {descriptionError && <span className="notice error">{descriptionError}</span>}
          </label>

          {mode === "lost" && (
            <label>
              Hidden identifiers*
              {aiLoading && <span style={{color: '#667eea', marginLeft: '8px', fontSize: '0.85em'}}>
                🤖 AI extracting...
              </span>}
              <textarea
                name="hiddenHints"
                value={form.hiddenHints}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                rows={3}
                maxLength={300}
                placeholder="AI will extract serial numbers and unique identifying marks"
                disabled={aiLoading}
              />
              {hiddenHintsError && <span className="notice error">{hiddenHintsError}</span>}
            </label>
          )}

          <label>
            Upload image
            <input
              type="file"
              name="image"
              accept="image/*"
              ref={fileInput}
              onChange={handleFile}
              onBlur={handleBlur}
              disabled={aiLoading}
            />
            <div className="file-hint">
              📸 Upload image - AI will automatically fill all fields!
              {aiLoading && <span style={{color: '#667eea', display: 'block', marginTop: '5px', fontWeight: '600'}}>
                ⏳ AI analyzing image content... Please wait
              </span>}
            </div>
          </label>

          {form.image && (
            <div style={{ margin: "12px 0" }}>
              <img
                src={form.image}
                alt="preview"
                style={{ maxWidth: 180, borderRadius: 8 }}
              />
              <button 
                type="button" 
                className="remove-image"
                onClick={() => setForm((f) => ({ ...f, image: "" }))}
                disabled={aiLoading}
              >
                Remove Image
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}