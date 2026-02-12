<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "./History.css";

export default function History() {
  const [activeTab, setActiveTab] = useState("found");
  const [historyData, setHistoryData] = useState({ found: [], claims: [], lost: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllHistoryData();
  }, []);

  // ✅ YE NAYA FUNCTION ADD KARO - FRONTEND DATA KO BACKEND MEIN SAVE KAREGA
  const saveToBackendHistory = async (data, type) => {
    try {
      const response = await fetch("http://localhost:5000/api/history", {
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
      console.log("📊 Fetching ALL history data");

      // ✅ Fetch ALL found items
      const foundItemsResponse = await fetch("http://localhost:5000/api/items/found");
      const foundItems = foundItemsResponse.ok ? await foundItemsResponse.json() : [];

      // ✅ Fetch ALL claims 
      const claimsResponse = await fetch("http://localhost:5000/api/claims");
      const claims = claimsResponse.ok ? await claimsResponse.json() : [];

      // ✅ Fetch ALL lost items
      const lostItemsResponse = await fetch("http://localhost:5000/api/items/lost");
      const lostItems = lostItemsResponse.ok ? await lostItemsResponse.json() : [];

      console.log("📦 Real Data:", { foundItems, claims, lostItems });

      // ✅ FRONTEND DATA KO BACKEND HISTORY MEIN SAVE KARO
      if (foundItems.length > 0) {
        foundItems.forEach(item => saveToBackendHistory(item, "found"));
      }
      if (claims.length > 0) {
        claims.forEach(claim => saveToBackendHistory(claim, "claim"));
      }
      if (lostItems.length > 0) {
        lostItems.forEach(item => saveToBackendHistory(item, "lost"));
      }

      setHistoryData({
        found: Array.isArray(foundItems) ? foundItems : [],
        claims: Array.isArray(claims) ? claims : [],
        lost: Array.isArray(lostItems) ? lostItems : []
      });
      
    } catch (error) {
      console.error("❌ Error fetching history data:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  // ✅ Get status display text
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

  // ✅ Get field value safely
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
=======
import React, { useState } from "react";
import "./History.css";

export default function History() {
  const [activeTab, setActiveTab] = useState("lost");

  // Mock Data
  const lostItems = [
    {
      id: 1,
      name: "Black Wallet",
      category: "Accessories",
      dateReported: "2025-09-10",
      status: "Pending",
    },
    {
      id: 2,
      name: "Samsung Galaxy S21",
      category: "Electronics",
      dateReported: "2025-08-15",
      status: "Matched",
    },
  ];

  const claims = [
    {
      id: 1,
      itemName: "Laptop Bag",
      dateClaimed: "2025-09-25",
      status: "Verified",
    },
    {
      id: 2,
      itemName: "Student ID Card",
      dateClaimed: "2025-08-20",
      status: "Rejected",
    },
  ];

  return (
    <section className="history-container">
      <h2 className="history-title">Your Activity History</h2>
      <p className="history-subtitle">
        Review your lost item reports and claim requests.
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      </p>

      <div className="history-tabs">
        <button
<<<<<<< HEAD
          className={`tab-button ${activeTab === "found" ? "active" : ""}`}
          onClick={() => setActiveTab("found")}
        >
          Found Items ({historyData.found.length})
=======
          className={`tab-button ${activeTab === "lost" ? "active" : ""}`}
          onClick={() => setActiveTab("lost")}
        >
          Lost Items
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
        </button>
        <button
          className={`tab-button ${activeTab === "claims" ? "active" : ""}`}
          onClick={() => setActiveTab("claims")}
        >
<<<<<<< HEAD
          Claims ({historyData.claims.length})
        </button>
        <button
          className={`tab-button ${activeTab === "lost" ? "active" : ""}`}
          onClick={() => setActiveTab("lost")}
        >
          Lost Items ({historyData.lost.length})
=======
          Claims
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
        </button>
      </div>

      <div className="history-content">
<<<<<<< HEAD
        {/* ✅ FOUND ITEMS TABLE */}
        {activeTab === "found" && (
=======
        {activeTab === "lost" ? (
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
<<<<<<< HEAD
                <th>Brand</th>
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
                <th>Date Reported</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {historyData.found.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">No found items in system</td>
                </tr>
              ) : (
                historyData.found.map((item, index) => (
                  <tr key={item._id || item.id || `found-${index}`}>
                    <td>{getFieldValue(item, ['name', 'itemName', 'title'])}</td>
                    <td>{getFieldValue(item, ['category', 'type'])}</td>
                    <td>{getFieldValue(item, ['brand', 'company'])}</td>
                    <td>{formatDate(getFieldValue(item, ['dateReported', 'createdAt', 'date']))}</td>
                    <td>{getStatusText(item, 'found')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* ✅ CLAIMS TABLE */}
        {activeTab === "claims" && (
=======
              {lostItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.dateReported}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Date Claimed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {historyData.claims.length === 0 ? (
                <tr>
                  <td colSpan="3" className="no-data">No claims in system</td>
                </tr>
              ) : (
                historyData.claims.map((claim, index) => (
                  <tr key={claim._id || claim.id || `claim-${index}`}>
                    <td>{getFieldValue(claim, ['itemName', 'name', 'title'])}</td>
                    <td>{formatDate(getFieldValue(claim, ['claimDate', 'dateClaimed', 'createdAt', 'date']))}</td>
                    <td>{getStatusText(claim, 'claims')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* ✅ LOST ITEMS TABLE */}
        {activeTab === "lost" && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Date Reported</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyData.lost.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-data">No lost items in system</td>
                </tr>
              ) : (
                historyData.lost.map((item, index) => (
                  <tr key={item._id || item.id || `lost-${index}`}>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.brand}</td>
                    <td>{formatDate(item.dateReported)}</td>
                    <td>{item.status || 'Active'}</td>
                  </tr>
                ))
              )}
=======
              {claims.map((claim) => (
                <tr key={claim.id}>
                  <td>{claim.itemName}</td>
                  <td>{claim.dateClaimed}</td>
                  <td>
                    <span className={`status ${claim.status.toLowerCase()}`}>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
