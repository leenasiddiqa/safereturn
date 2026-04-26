import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminClaims.css";

export default function AdminClaims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetchClaims();
  }, []);

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const fetchClaims = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/claims");
      const claimsData = await response.json();
      const pendingClaims = claimsData.filter(claim => claim.status === "pending");
      setClaims(pendingClaims);
    } catch (error) {
      console.error("Error:", error);
      showMessage("❌ Error fetching claims", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (claim, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/claims/${claim._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setClaims(prevClaims => prevClaims.filter(c => c._id !== claim._id));

        const userId = claim.claimantName.toLowerCase().replace(/\s+/g, '_');
        let message = newStatus === "approved" 
          ? `Your claim for item ${claim.itemName} is approved. Collect your item from SSD.`
          : `Your claim for item ${claim.itemName} is rejected. Please contact admin.`;

        await fetch("http://localhost:5000/api/notifications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            type: `claim_${newStatus}`,
            message: message,
            relatedItemId: claim._id
          }),
        });

        showMessage(`✅ Claim ${newStatus}! User notified.`, "success");
      } else {
        showMessage(`❌ Error: ${result.message}`, "error");
      }

    } catch (error) {
      console.error("Error:", error);
      showMessage("❌ Error updating claim. Please try again.", "error");
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />
        <main className="admin-main">
          <h2 className="admin-title">Loading Claims...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main">
        <h2 className="admin-title">Manage Claims</h2>
        
        {message && (
          <div className={`notice ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="admin-panel">
          {claims.length === 0 ? (
            <p>No pending claims.</p>
          ) : (
            <ul className="admin-list">
              {claims.map((claim) => (
                <li 
  key={claim._id} 
  className="admin-list-item"
  style={{
    backgroundColor: "#fff3cd",
    border: "2px solid #ffc107",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px"
  }}
>
  
  
  {/* ✅ WHITE BOX INSIDE - JAISA IMPORTANT DOCUMENTS MEIN HAI */}
  <div style={{
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "10px",
    borderLeft: "4px solid #ffc107"
  }}>
    <div className="claim-details">
      <div className="claim-header">
        <strong>{claim.claimantName}</strong>
        <span className={`status-badge ${claim.status}`}>
          {claim.status}
        </span>
      </div>
      <div className="claim-info">
        <p><strong>Item:</strong> {claim.itemName} ({claim.itemBrand})</p>
        <p><strong>Item ID:</strong> {claim.itemId || claim.foundItemId}</p>
        <p><strong>Contact:</strong> {claim.contact}</p>
        <p><strong>User Name:</strong> {claim.claimantName.toLowerCase().replace(/\s+/g, '_')}</p>
        <p><strong>Category:</strong> {claim.itemCategory}</p>
        <p><strong>Location:</strong> {claim.itemLocation}</p>
        {claim.providedHints && (
          <p><strong>User Hints:</strong> {claim.providedHints}</p>
        )}
        <p className="claim-date">
          <small>Claimed on: {new Date(claim.claimDate).toLocaleDateString()}</small>
        </p>
      </div>
    </div>
    <div className="admin-actions">
      <button onClick={() => handleStatusUpdate(claim, "approved")} className="btn approve">
        ✅ Approve
      </button>
      <button onClick={() => handleStatusUpdate(claim, "rejected")} className="btn reject">
        ❌ Reject
      </button>
    </div>
  </div>
</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}