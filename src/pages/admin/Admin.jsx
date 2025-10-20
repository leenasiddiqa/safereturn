import { useState } from "react";
import { useStore } from "../../StoreContext";
import AdminSidebar from "../../components/AdminSidebar";
import "./Admin.css";

export default function Admin() {
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
                <option value="all">All</option>
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
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>

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
          </ul>
        </div>
      </main>
    </div>
  );
}
