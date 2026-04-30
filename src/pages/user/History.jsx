import React, { useState, useEffect } from "react";
import "./History.css";

export default function History() {
  const [activeTab, setActiveTab] = useState("found");
  const [historyData, setHistoryData] = useState({ found: [], claims: [], lost: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllHistoryData();
  }, []);

  // Save history to backend
  const saveToBackendHistory = async (data, type) => {
    try {
      const response = await fetch("http://localhost:5000/api/history?userId=${currentUser._id}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user-from-frontend",
          itemId: data._id || Date.now().toString(),
          itemName: data.name || data.itemName || "Unknown",
          category: data.category || "General",
          type: type,
          action: `${type}_viewed`,
          status: "completed"
        }),
      });
      
      const result = await response.json();
      console.log("✅ Saved to backend history:", result);
    } catch (error) {
      console.error("❌ Error saving to history:", error);
    }
  };

 const fetchAllHistoryData = async () => {
  try {
    console.log("📊 Fetching history data...");
    
    //  Get current user
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user._id || user.id;
    
    if (!userId) {
      console.log("❌ No user logged in");
      setLoading(false);
      return;
    }
    
    //  Fetch only current user's items
    const foundItemsResponse = await fetch(`http://localhost:5000/api/items/found?userId=${userId}`);
    const claimsResponse = await fetch(`http://localhost:5000/api/claims?userId=${userId}`);
    const lostItemsResponse = await fetch(`http://localhost:5000/api/items/lost?userId=${userId}`);
    
    const foundItems = foundItemsResponse.ok ? await foundItemsResponse.json() : [];
    const claims = claimsResponse.ok ? await claimsResponse.json() : [];
    const lostItems = lostItemsResponse.ok ? await lostItemsResponse.json() : [];
    
    console.log("📦 User's history:", { foundItems, claims, lostItems });
    
    setHistoryData({
      found: Array.isArray(foundItems) ? foundItems : [],
      claims: Array.isArray(claims) ? claims : [],
      lost: Array.isArray(lostItems) ? lostItems : []
    });
    
  } catch (error) {
    console.error("❌ Error fetching history:", error);
  } finally {
    setLoading(false);
  }
};

  //  Format date 
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  //  Get status display text
  const getStatusText = (item, type) => {
    if (type === 'found') {
      return item.claimed ? 'Claimed' : 'Not Claimed';
    }
    if (type === 'claims') {
      return item.status || 'Pending';
    }
    if (type === 'lost') {
      return item.status || 'Active';
    }
    return 'Unknown';
  };

  //  Get field value 
  const getFieldValue = (item, fieldNames) => {
    for (let field of fieldNames) {
      if (item[field] !== undefined && item[field] !== null) {
        return item[field];
      }
    }
    return 'N/A';
  };

  if (loading) {
    return (
      <section className="history-container">
        <h2 className="history-title">Item History</h2>
        <p className="history-subtitle">Loading your data...</p>
      </section>
    );
  }

  return (
    <section className="history-container">
      <h2 className="history-title">Item History</h2>
      <p className="history-subtitle">
        Review all found items, claims, and lost items in the system.
      </p>

      <div className="history-tabs">
        <button
          className={`tab-button ${activeTab === "found" ? "active" : ""}`}
          onClick={() => setActiveTab("found")}
        >
          Found Items ({historyData.found.length})
        </button>
        <button
          className={`tab-button ${activeTab === "claims" ? "active" : ""}`}
          onClick={() => setActiveTab("claims")}
        >
          Claims ({historyData.claims.length})
        </button>
        <button
          className={`tab-button ${activeTab === "lost" ? "active" : ""}`}
          onClick={() => setActiveTab("lost")}
        >
          Lost Items ({historyData.lost.length})
        </button>
      </div>

      <div className="history-content">
        {/*  FOUND ITEMS TABLE */}
        {activeTab === "found" && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Date Reported</th>
              </tr>
            </thead>
            <tbody>
              {historyData.found.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">No found items in system</td>
                </tr>
              ) : (
                historyData.found.map((item, index) => (
                  <tr key={item._id || item.id || `found-${index}`}>
                    <td>{getFieldValue(item, ['name', 'itemName', 'title'])}</td>
                    <td>{getFieldValue(item, ['category', 'type'])}</td>
                    <td>{getFieldValue(item, ['brand', 'company'])}</td>
                    <td>{formatDate(getFieldValue(item, ['dateReported', 'createdAt', 'date']))}</td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/*  CLAIMS TABLE */}
        {activeTab === "claims" && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Date Claimed</th>
              </tr>
            </thead>
            <tbody>
              {historyData.claims.length === 0 ? (
                <tr>
                  <td colSpan="2" className="no-data">No claims in system</td>
                </tr>
              ) : (
                historyData.claims.map((claim, index) => (
                  <tr key={claim._id || claim.id || `claim-${index}`}>
                    <td>{getFieldValue(claim, ['itemName', 'name', 'title'])}</td>
                    <td>{formatDate(getFieldValue(claim, ['claimDate', 'dateClaimed', 'createdAt', 'date']))}</td>
                  
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/*  LOST ITEMS TABLE */}
        {activeTab === "lost" && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Date Reported</th>
              </tr>
            </thead>
            <tbody>
              {historyData.lost.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-data">No lost items in system</td>
                </tr>
              ) : (
                historyData.lost.map((item, index) => (
                  <tr key={item._id || item.id || `lost-${index}`}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>{formatDate(item.dateReported)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}