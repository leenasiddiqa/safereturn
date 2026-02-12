import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Claim.css";

export default function Claim() {
  const [form, setForm] = useState({
    itemId: "",
    claimantName: "",
    contact: "",
    providedHints: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  
  const location = useLocation();

  // ✅ URL se item ID extract karna aur auto-fill karna
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const itemIdFromUrl = urlParams.get('itemId');
    
    if (itemIdFromUrl) {
      setForm(prev => ({ ...prev, itemId: itemIdFromUrl }));
      fetchItemDetails(itemIdFromUrl);
    }
  }, [location]);

  // ✅ Item details fetch karna
  const fetchItemDetails = async (itemId) => {
    try {
      const [lostResponse, foundResponse] = await Promise.all([
        fetch("http://localhost:5000/api/items/lost"),
        fetch("http://localhost:5000/api/items/found")
      ]);

      const lostItems = await lostResponse.json();
      const foundItems = await foundResponse.json();

      // Combine both lost and found items
      const allItems = [...lostItems, ...foundItems];
      const item = allItems.find(item => item._id === itemId);
      
      if (item) {
        setItemDetails(item);
      }
    } catch (error) {
      console.error("Error fetching item details:", error);
    }
  };

  // ✅ Backend mein claim save karna
  const saveClaimToBackend = async (claimData) => {
    try {
      const response = await fetch("http://localhost:5000/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(claimData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }
      
      if (result.success) {
        return result.claim;
      } else {
        throw new Error(result.message || "Unknown error occurred");
      }
      
    } catch (error) {
      throw error;
    }
  };

  // ✅ Contact validation function
  const validateContact = (contact) => {
    // Phone number check (exactly 11 digits)
    const phoneRegex = /^\d{11}$/;
    // Email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return phoneRegex.test(contact) || emailRegex.test(contact);
  };

  // ✅ Name validation - only letters and spaces, max 15 characters
  const handleNameChange = (value) => {
    // Allow only letters and spaces
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    // Max 15 characters
    const truncatedValue = filteredValue.slice(0, 15);
    setForm({ ...form, claimantName: truncatedValue });
  };

  async function submit(e) {
    e.preventDefault();
    
    // ✅ Validation checks
    if (!form.itemId || !form.claimantName || !form.contact || !form.providedHints) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    if (form.claimantName.trim().length < 1) {
      setMessage("❌ Please enter your name.");
      return;
    }

    if (!validateContact(form.contact)) {
      setMessage("❌ Contact must be a valid phone number (11 digits) or email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ✅ Item details fetch karen
      if (!itemDetails) {
        setMessage("❌ Item ID not found. Please check the ID and try again.");
        setLoading(false);
        return;
      }

      const item = itemDetails;
      const type = item.type || "found";

      // ✅ Auto-approval logic
      const hints = (item.hiddenHints || "")
        .toLowerCase()
        .split(/\W+/)
        .filter(Boolean);
      const provided = (form.providedHints || "").toLowerCase().split(/\W+/);
      const autoApprove =
        hints.length > 0 && hints.every((h) => provided.includes(h));

      // ✅ Claim data prepare karen
      const claimData = {
        claimantName: form.claimantName.trim(),
        contact: form.contact.trim(),
        providedHints: form.providedHints.trim(),
        itemId: form.itemId,
        itemName: item.name,
        itemBrand: item.brand || "Unknown",
        itemCategory: item.category || "Other", 
        itemLocation: item.location,
        itemType: type,
        status: autoApprove ? "auto-approved" : "pending"
      };

      console.log("📤 Sending claim data:", claimData);

      // ✅ Backend mein save karen
      const savedClaim = await saveClaimToBackend(claimData);

      if (autoApprove) {
        setMessage(
          "✅ Claim submitted and auto-approved based on matching identifiers. Admin will finalize."
        );
      } else {
        setMessage(
          "✅ Claim submitted for review. Admin will verify and finalize."
        );
      }

      // ✅ Form reset karen
      setForm({ 
        itemId: "", 
        claimantName: "", 
        contact: "", 
        providedHints: "" 
      });
      setItemDetails(null);
      
    } catch (error) {
      console.error("❌ Claim submit error:", error);
      setMessage("❌ Error submitting claim: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="claim-container">
      <h2>Claim & Verification</h2>

      {message && (
        <div className={`notice ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form className="claim-form" onSubmit={submit}>
        <label>
          Item ID*
          <input
            type="text"
            value={form.itemId}
            readOnly
            disabled
            className="readonly-input"
          />
        </label>

        <div className="form-grid">
          <label>
            Your Name*
            <input
              type="text"
              placeholder="Enter your full name (max 15 characters)"
              value={form.claimantName}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              disabled={loading}
              maxLength={15}
            />
          </label>
          <label>
            Contact Info*
            <input
              type="text"
              placeholder="Phone (11 digits) or Email"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              required
              disabled={loading}
            />
          </label>
        </div>

        <label>
          Provide Identifiers to Verify Ownership *
          <textarea
            placeholder="Describe unique details or identifiers of the item"
            value={form.providedHints}
            onChange={(e) =>
              setForm({ ...form, providedHints: e.target.value })
            }
            rows={3}
            required
            disabled={loading}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Claim"}
        </button>
      </form>
    </section>
  );
}