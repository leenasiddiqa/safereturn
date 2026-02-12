<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
import { useStore } from "../../StoreContext";
import AdminSidebar from "../../components/AdminSidebar";
import "./Admin.css";

export default function Admin() {
<<<<<<< HEAD
  const { state, reviewClaim } = useStore();
  const { logs: frontendLogs } = state;
  const [filter, setFilter] = useState("all");
  const [claims, setClaims] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [combinedLogs, setCombinedLogs] = useState([]); // ✅ Combined logs from multiple APIs
  const [loading, setLoading] = useState(true);

  // ✅ Backend se REAL data fetch karo
  useEffect(() => {
    fetchRealDataFromBackend();
  }, []);

  const fetchRealDataFromBackend = async () => {
    try {
      // ✅ Claims fetch karo
      const claimsResponse = await fetch("http://localhost:5000/api/claims");
      const claimsData = await claimsResponse.json();
      setClaims(claimsData);

      // ✅ Lost Items fetch karo
      const lostResponse = await fetch("http://localhost:5000/api/items/lost");
      const lostData = await lostResponse.json();
      setLostItems(lostData);

      // ✅ Found Items fetch karo  
      const foundResponse = await fetch("http://localhost:5000/api/items/found");
      const foundData = await foundResponse.json();
      setFoundItems(foundData);

      setLoading(false);
      
      // ✅ COMBINE DATA TO CREATE LOGS
      generateCombinedLogs(claimsData, lostData, foundData);

    } catch (error) {
      console.error("❌ Error fetching real data:", error);
      setLoading(false);
    }
  };

  // ✅ Combine data from multiple APIs to create meaningful logs
  const generateCombinedLogs = (claimsData, lostData, foundData) => {
    const logs = [];

    // ✅ 1. Lost Items Activities
    lostData.forEach(item => {
      logs.push({
        timestamp: item.date || item.createdAt || new Date().toISOString(),
        type: 'item:lost',
        itemId: item._id,
        itemName: item.name,
        message: `📝 Lost Item Reported - ${item.name}`
      });
    });

    // ✅ 2. Found Items Activities  
    foundData.forEach(item => {
      logs.push({
        timestamp: item.date || item.createdAt || new Date().toISOString(),
        type: 'item:found',
        itemId: item._id,
        itemName: item.name,
        message: `🔍 Found Item Reported - ${item.name}`
      });
    });

    // ✅ 3. Claims Activities
    claimsData.forEach(claim => {
      let message = '';
      
      if (claim.status === 'pending') {
        message = `📋 Claim Submitted - ${claim.itemName} by ${claim.claimantName}`;
      } else if (claim.status === 'approved') {
        message = `✅ Claim Approved - ${claim.itemName} by ${claim.claimantName}`;
      } else if (claim.status === 'rejected') {
        message = `❌ Claim Rejected - ${claim.itemName} by ${claim.claimantName}`;
      }

      logs.push({
        timestamp: claim.claimDate || claim.createdAt || new Date().toISOString(),
        type: `claim:${claim.status}`,
        itemId: claim.itemId,
        itemName: claim.itemName,
        message: message
      });
    });

    // ✅ Sort by timestamp (newest first)
    logs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    setCombinedLogs(logs);
  };

  const handleReview = async (claimId, action) => {
    try {
      const response = await fetch(`http://localhost:5000/api/claims/${claimId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action === "approve" ? "approved" : "rejected" })
      });

      if (response.ok) {
        reviewClaim(claimId, action);
        fetchRealDataFromBackend(); // Refresh data to update logs
        alert(`Claim ${action === "approve" ? "approved" : "rejected"} successfully!`);
      }
    } catch (error) {
      console.error("Error updating claim:", error);
      alert("Error updating claim. Please try again.");
    }
  };

  // ✅ Duplicate claims hatane ke liye
  const uniqueClaims = claims.filter((claim, index, self) => 
    index === self.findIndex(c => c._id === claim._id)
  );

  const filteredClaims = uniqueClaims.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

  const getStatusMessage = (status) => {
    switch(status) {
      case "pending": return "Pending";
      case "approved": return "Approved";
      case "rejected": return "Rejected";
      default: return status;
    }
  };

  // ✅ Format date without seconds
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />
        <main className="admin-main">
          <h2 className="admin-title">Loading Real Data...</h2>
        </main>
      </div>
    );
  }

=======
  const { state, reviewClaim, finalizeClaim } = useStore();
  const { items, claims, logs } = state;
  const [filter, setFilter] = useState("all");

  function handleReview(claimId, action) {
    reviewClaim(claimId, action);
  }

  function handleFinalize(claimId) {
    finalizeClaim(claimId);
  }

  const filteredClaims = claims.filter((c) =>
    filter === "all" ? true : c.status === filter
  );

>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <h2 className="admin-title">Admin Dashboard</h2>

        <div className="admin-grid">
          {/* Claims Review */}
          <div className="admin-panel">
            <h3>Claims Review</h3>
            <label>
              Status Filter
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="admin-select"
              >
<<<<<<< HEAD
                <option value="all">All Claims</option>
=======
                <option value="all">All</option>
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </label>

            <ul className="admin-list">
              {filteredClaims.length === 0 ? (
                <p className="admin-empty">No claims available.</p>
              ) : (
                filteredClaims.map((c) => (
<<<<<<< HEAD
                  <li key={c._id} className="admin-list-item">
                    <div className="claim-info">
                      <div className="claim-header">
                        <strong>{c.claimantName}</strong> — Item: {c.itemName} 
                      </div>
                      <div className={`status-message ${c.status}`}>
                        {getStatusMessage(c.status)}
                      </div>
=======
                  <li key={c.id} className="admin-list-item">
                    <div>
                      <strong>{c.claimantName}</strong> — item ID {c.itemId} —{" "}
                      <em>{c.status}</em>
                    </div>
                    <div className="admin-actions">
                      <button
                        onClick={() => handleReview(c.id, "approve")}
                        className="btn approve"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReview(c.id, "reject")}
                        className="btn reject"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleFinalize(c.id)}
                        className="btn finalize"
                        disabled={c.status !== "approved"}
                      >
                        Finalize
                      </button>
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

<<<<<<< HEAD
          {/* REAL ITEMS OVERVIEW */}
          <div className="admin-panel">
            <h3>Items Overview</h3>
            
            <div className="items-section">
              <h4>Lost Items ({lostItems.length})</h4>
              <ul className="admin-list">
                {lostItems.length === 0 ? (
                  <p className="admin-empty">No lost items in database.</p>
                ) : (
                  lostItems.slice(0, 10).map((item) => (
                    <li key={item._id} className="admin-list-item">
                      • {item.name} — {item.brand} — {item.location}
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="items-section">
              <h4>Found Items ({foundItems.length})</h4>
              <ul className="admin-list">
                {foundItems.length === 0 ? (
                  <p className="admin-empty">No found items in database.</p>
                ) : (
                  foundItems.slice(0, 10).map((item) => (
                    <li key={item._id} className="admin-list-item">
                      • {item.name} — {item.brand} — {item.location}
                      {item.claimed ? " • ✅ Claimed" : " • ⏳ Unclaimed"}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* ✅ COMBINED REAL-TIME ACTIVITY LOGS */}
        <div className="admin-panel logs">
          <h3>Real-time Activity Logs</h3>
          <ul className="admin-list">
            {combinedLogs.length === 0 ? (
              <p className="admin-empty">No activities yet.</p>
            ) : (
              combinedLogs.slice(0, 50).map((log, idx) => (
                <li key={idx} className="admin-list-item">
                  <code>{formatDate(log.timestamp)}</code> — {log.message}
                </li>
              ))
            )}
=======
          {/* Items Overview */}
          <div className="admin-panel">
            <h3>Items Overview</h3>
            <ul className="admin-list">
              {items.slice(0, 20).map((i) => (
                <li key={i.id} className="admin-list-item">
                  <strong>{i.type.toUpperCase()}</strong> • {i.name} — {i.brand}{" "}
                  — {i.location} {i.claimId ? "• Claimed" : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logs */}
        <div className="admin-panel logs">
          <h3>Activity Logs</h3>
          <ul className="admin-list">
            {logs.slice(0, 50).map((l, idx) => (
              <li key={idx} className="admin-list-item">
                <code>{new Date(l.ts).toLocaleString()}</code> — {l.type} —{" "}
                {l.itemId || ""} {l.claimId || ""}
              </li>
            ))}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          </ul>
        </div>
      </main>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
