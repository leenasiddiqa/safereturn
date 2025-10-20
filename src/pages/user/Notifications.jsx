import React from "react";
import "./Notifications.css";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "match",
      message: "A possible match found for your lost wallet.",
      date: "2025-10-17",
      status: "New",
    },
    {
      id: 2,
      type: "claim",
      message:
        "Your claim has been verified. Collect your item from SSD (Student Service Department).",
      date: "2025-10-16",
      status: "Unread",
    },
    {
      id: 3,
      type: "donation",
      message:
        "An unclaimed item you reported has been marked for donation after 30 days.",
      date: "2025-10-10",
      status: "Read",
    },
  ];

  return (
    <section className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <p className="notifications-subtitle">
        Stay updated with your latest activity and admin alerts.
      </p>

      <div className="notifications-list">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`notification-card ${n.status.toLowerCase()}`}
            >
              <div className="notification-header">
                <span className={`notification-type ${n.type}`}>
                  {n.type.charAt(0).toUpperCase() + n.type.slice(1)}
                </span>
                <span className="notification-date">{n.date}</span>
              </div>
              <p className="notification-message">{n.message}</p>
              <button className="mark-read-btn">Mark as Read</button>
            </div>
          ))
        ) : (
          <p className="no-notifications">No new notifications</p>
        )}
      </div>
    </section>
  );
}
