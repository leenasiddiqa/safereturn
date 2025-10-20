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
      </p>

      <div className="history-tabs">
        <button
          className={`tab-button ${activeTab === "lost" ? "active" : ""}`}
          onClick={() => setActiveTab("lost")}
        >
          Lost Items
        </button>
        <button
          className={`tab-button ${activeTab === "claims" ? "active" : ""}`}
          onClick={() => setActiveTab("claims")}
        >
          Claims
        </button>
      </div>

      <div className="history-content">
        {activeTab === "lost" ? (
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Category</th>
                <th>Date Reported</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
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
          <table className="history-table">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Date Claimed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
