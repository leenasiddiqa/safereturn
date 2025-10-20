import React from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminClaims.css";

export default function AdminClaims() {
  const claims = [
    { id: "C001", claimantName: "Ali", itemId: "L001", status: "pending" },
    { id: "C002", claimantName: "Sara", itemId: "L002", status: "approved" },
  ];

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <h2 className="admin-title">Manage Claims</h2>
        <div className="admin-panel">
          <ul className="admin-list">
            {claims.map((c) => (
              <li key={c.id} className="admin-list-item">
                <div>
                  <strong>{c.claimantName}</strong> — item ID {c.itemId} —{" "}
                  <em>{c.status}</em>
                </div>
                <div className="admin-actions">
                  <button className="btn approve">Approve</button>
                  <button className="btn reject">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
