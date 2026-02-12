<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import "./Notifications.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/all-notifications`);

      if (response.ok) {
        const allNotifications = await response.json();
        console.log("📦 All notifications from backend:", allNotifications);

        // ✅ Remove duplicates based on userId + type + relatedItemId
        const uniqueNotifications = allNotifications.filter(
          (notif, index, arr) =>
            index === arr.findIndex(
              n => n.userId === notif.userId && n.type === notif.type && n.relatedItemId === notif.relatedItemId
            )
        );

        setNotifications(uniqueNotifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notifications/${notificationId}/read`, {
        method: "PUT",
      });

      if (response.ok) {
        setNotifications(prevNotifications =>
          prevNotifications.filter(notif => notif._id !== notificationId)
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <section className="notifications-container">
        <h2 className="notifications-title">Notifications</h2>
        <p className="notifications-subtitle">
          Stay updated with your latest activity and admin alerts.
        </p>
        <p>Loading...</p>
      </section>
    );
  }
=======
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
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

  return (
    <section className="notifications-container">
      <h2 className="notifications-title">Notifications</h2>
      <p className="notifications-subtitle">
        Stay updated with your latest activity and admin alerts.
      </p>

      <div className="notifications-list">
        {notifications.length > 0 ? (
<<<<<<< HEAD
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`notification-card ${notification.status.toLowerCase()}`}
            >
              <div className="notification-header">
                <span className={`notification-type ${notification.type}`}>
                  {notification.type === 'match' ? 'Match' : 
                   notification.type === 'claim_approved' ? 'Claim' :
                   notification.type === 'claim_rejected' ? 'Claim' :
                   'Donation'}
                </span>
                <span className="notification-date">
                  {new Date(notification.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="notification-message">{notification.message}</p>

              {notification.status === "new" && (
                <button 
                  className="mark-read-btn"
                  onClick={() => markAsRead(notification._id)}
                >
                  Mark as Read
                </button>
              )}
=======
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
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
            </div>
          ))
        ) : (
          <p className="no-notifications">No new notifications</p>
        )}
      </div>
    </section>
  );
}
