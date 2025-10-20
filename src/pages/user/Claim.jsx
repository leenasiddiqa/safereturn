// Claim.jsx
import React, { useState } from "react";
import { useStore } from "../../StoreContext";
import "./Claim.css";

export default function Claim() {
  const { state, addClaim, reviewClaim } = useStore();
  const { items } = state;

  const [form, setForm] = useState({
    itemId: "",
    claimantName: "",
    contact: "",
    providedHints: "",
  });
  const [message, setMessage] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!form.itemId || !form.claimantName || !form.contact) {
      setMessage("⚠️ Please fill all required fields.");
      return;
    }

    const item = items.find((i) => i.id === form.itemId);
    const hints = (item?.hiddenHints || "")
      .toLowerCase()
      .split(/\W+/)
      .filter(Boolean);
    const provided = (form.providedHints || "").toLowerCase().split(/\W+/);
    const autoApprove =
      hints.length > 0 && hints.every((h) => provided.includes(h));

    addClaim(form);
    const claimId = state.claims[0]?.id;
    if (autoApprove && claimId) {
      reviewClaim(claimId, "approve");
      setMessage(
        "✅ Claim submitted and auto-approved based on matching identifiers. Admin will finalize."
      );
    } else {
      setMessage(
        "✅ Claim submitted for review. Admin will verify and finalize."
      );
    }

    setForm({ itemId: "", claimantName: "", contact: "", providedHints: "" });
  }

  return (
    <section className="claim-container">
      <h2>Claim & Verification</h2>

      {message && <div className="notice">{message}</div>}

      <form className="claim-form" onSubmit={submit}>
        <label>
          Item ID*
          <input
            type="text"
            placeholder="Enter the item ID you want to claim"
            value={form.itemId}
            onChange={(e) => setForm({ ...form, itemId: e.target.value })}
            required
          />
        </label>

        <div className="form-grid">
          <label>
            Your Name*
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.claimantName}
              onChange={(e) =>
                setForm({ ...form, claimantName: e.target.value })
              }
              required
            />
          </label>
          <label>
            Contact Info*
            <input
              type="text"
              placeholder="Phone or Email"
              value={form.contact}
              onChange={(e) => setForm({ ...form, contact: e.target.value })}
              required
            />
          </label>
        </div>

        <label>
          Provide Identifiers to Verify Ownership
          <textarea
            placeholder="Describe unique details or identifiers of the item"
            value={form.providedHints}
            onChange={(e) =>
              setForm({ ...form, providedHints: e.target.value })
            }
            rows={3}
          />
        </label>

        <button type="submit">Submit Claim</button>
      </form>
    </section>
  );
}
