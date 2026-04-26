import { useState, useEffect } from "react";
import { useStore } from "../../StoreContext";
import AdminSidebar from "../../components/AdminSidebar";
import "./Admin.css";

export default function Admin() {
  const { state, reviewClaim } = useStore();
  const { logs: frontendLogs } = state;
  const [filter, setFilter] = useState("all");
  const [claims, setClaims] = useState([]);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [importantDocs, setImportantDocs] = useState([]);
  const [combinedLogs, setCombinedLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRealDataFromBackend();
  }, []);

  const fetchRealDataFromBackend = async () => {
    try {
      const claimsResponse = await fetch("http://localhost:5000/api/claims");
      const claimsData = await claimsResponse.json();
      setClaims(claimsData);

      const lostResponse = await fetch("http://localhost:5000/api/items/lost");
      const lostData = await lostResponse.json();
      setLostItems(lostData);

      const foundResponse = await fetch("http://localhost:5000/api/items/found");
      const foundData = await foundResponse.json();
      setFoundItems(foundData);
      
      const lostImportant = lostData.filter(item => item.isImportantDoc === true && item.resolved !== true).map(item => ({
        ...item,
        docType: "lost"
      }));
      const foundImportant = foundData.filter(item => item.isImportantDoc === true && item.resolved !== true).map(item => ({
        ...item,
        docType: "found"
      }));
      const allImportantDocs = [...lostImportant, ...foundImportant];
      setImportantDocs(allImportantDocs);

      setLoading(false);
      generateCombinedLogs(claimsData, lostData, foundData);

    } catch (error) {
      console.error("❌ Error fetching real data:", error);
      setLoading(false);
    }
  };

  const generateCombinedLogs = (claimsData, lostData, foundData) => {
    const logs = [];

    lostData.forEach(item => {
      logs.push({
        timestamp: item.date || item.createdAt || new Date().toISOString(),
        type: 'item:lost',
        itemId: item._id,
        itemName: item.name,
        message: `📝 Lost Item Reported - ${item.name}`
      });
    });

    foundData.forEach(item => {
      logs.push({
        timestamp: item.date || item.createdAt || new Date().toISOString(),
        type: 'item:found',
        itemId: item._id,
        itemName: item.name,
        message: `🔍 Found Item Reported - ${item.name}${item.isImportantDoc ? ' (⚠️ IMPORTANT DOCUMENT)' : ''}`
      });
    });

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
        fetchRealDataFromBackend();
        alert(`Claim ${action === "approve" ? "approved" : "rejected"} successfully!`);
      }
    } catch (error) {
      console.error("Error updating claim:", error);
      alert("Error updating claim. Please try again.");
    }
  };

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

  const getPendingCount = () => uniqueClaims.filter(c => c.status === "pending").length;

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

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <div className="admin-header">
          <h2 className="admin-title">Admin Dashboard</h2>
          <button className="refresh-btn" onClick={fetchRealDataFromBackend}>
            ↻ Refresh
          </button>
        </div>

        {/* STATS ROW */}
        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-num">{uniqueClaims.length}</div>
            <div className="stat-label">Total Claims</div>
            <div className="stat-delta">+{getPendingCount()} pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{getPendingCount()}</div>
            <div className="stat-label">Pending Review</div>
            <div className="stat-delta">Needs attention</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{lostItems.length}</div>
            <div className="stat-label">Lost Items</div>
            <div className="stat-delta">In database</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{foundItems.length}</div>
            <div className="stat-label">Found Items</div>
            <div className="stat-delta">Unclaimed</div>
          </div>
        </div>

        {/* IMPORTANT DOCUMENTS SECTION */}
        {importantDocs.length > 0 && (
          <div className="important-docs-section">
            <h3 style={{ color: "#633806", display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              ⚠️ URGENT: Important Documents ({importantDocs.length})
            </h3>
            <div className="important-docs-list">
              {importantDocs.map(doc => (
                <div key={doc._id} className="important-doc-item">
                  <p><strong>Type:</strong> {doc.docType === "lost" ? "LOST" : "FOUND"}</p>
                  <p><strong>Item:</strong> {doc.name}</p>
                  <p><strong>Brand:</strong> {doc.brand}</p>
                  <p><strong>Location:</strong> {doc.location}</p>
                  <p><strong>Date:</strong> {new Date(doc.dateReported).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="admin-grid">
          {/* Claims Review */}
          <div className="admin-panel">
            <div className="panel-header">
              <h3>Claims Review</h3>
              <span className="panel-badge">{getPendingCount()} pending</span>
            </div>
            
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === "all" ? "active" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === "pending" ? "active" : ""}`}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button 
                className={`filter-btn ${filter === "approved" ? "active" : ""}`}
                onClick={() => setFilter("approved")}
              >
                Approved
              </button>
              <button 
                className={`filter-btn ${filter === "rejected" ? "active" : ""}`}
                onClick={() => setFilter("rejected")}
              >
                Rejected
              </button>
            </div>

            <ul className="admin-list">
              {filteredClaims.length === 0 ? (
                <p className="admin-empty">No claims available.</p>
              ) : (
                filteredClaims.map((c) => (
                  <li key={c._id} className="admin-list-item" style={{
                    backgroundColor: c.isImportantDoc === true ? "#FAEEDA" : "transparent",
                    borderLeft: c.isImportantDoc === true ? "3px solid #EF9F27" : "none",
                    padding: "10px 12px",
                    marginBottom: "6px",
                    borderRadius: "5px"
                  }}>
                    <div className="claim-info">
                      <div className="claim-header">
                        <strong>{c.claimantName}</strong> — Item: {c.itemName}
                        {c.isImportantDoc === true && (
                          <span style={{
                            backgroundColor: "#EF9F27",
                            color: "#412402",
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "10px",
                            marginLeft: "10px",
                            fontWeight: "bold"
                          }}>
                            URGENT
                          </span>
                        )}
                      </div>
                      <div className={`status-message ${c.status}`}>
                        {getStatusMessage(c.status)}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* ITEMS OVERVIEW */}
          <div className="admin-panel">
            <div className="panel-header">
              <h3>Items Overview</h3>
            </div>
            
            <div className="items-section">
              <h4>Lost Items ({lostItems.length})</h4>
              <ul className="admin-list">
                {lostItems.length === 0 ? (
                  <p className="admin-empty">No lost items in database.</p>
                ) : (
                  lostItems.slice(0, 5).map((item) => (
                    <li key={item._id} className="admin-list-item item-row" style={{ 
                      backgroundColor: item.isImportantDoc ? "#FAEEDA" : "transparent",
                      borderLeft: item.isImportantDoc ? "3px solid #EF9F27" : "none"
                    }}>
                      <span className="item-bullet">•</span>
                      <span className="item-name">{item.name}</span>
                      <span className="item-details">{item.brand}</span>
                      <span className="item-location">{item.location}</span>
                      {item.isImportantDoc && <span className="badge-urgent">URGENT</span>}
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div style={{ height: "1px", background: "#e8ecf0", margin: "10px 0" }} />

            <div className="items-section">
              <h4>Found Items ({foundItems.length})</h4>
              <ul className="admin-list">
                {foundItems.length === 0 ? (
                  <p className="admin-empty">No found items in database.</p>
                ) : (
                  foundItems.slice(0, 5).map((item) => (
                    <li key={item._id} className="admin-list-item item-row" style={{ 
                      backgroundColor: item.isImportantDoc ? "#FAEEDA" : "transparent",
                      borderLeft: item.isImportantDoc ? "3px solid #EF9F27" : "none"
                    }}>
                      <span className="item-bullet">•</span>
                      <span className="item-name">{item.name}</span>
                      <span className="item-details">{item.brand}</span>
                      <span className="item-location">{item.location}</span>
                      {item.claimed ? <span className="badge-claimed">✓ Claimed</span> : ""}
                      {item.isImportantDoc && <span className="badge-urgent">URGENT</span>}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* ACTIVITY LOGS */}
        <div className="admin-panel logs">
          <div className="panel-header">
            <h3>Activity Log</h3>
            <span className="panel-badge">Live</span>
          </div>
          <ul className="admin-list">
            {combinedLogs.length === 0 ? (
              <p className="admin-empty">No activities yet.</p>
            ) : (
              combinedLogs.slice(0, 30).map((log, idx) => (
                <li key={idx} className="admin-list-item log-item">
                  <code className="log-timestamp">{formatDate(log.timestamp)}</code>
                  <span className="log-message">— {log.message}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}
