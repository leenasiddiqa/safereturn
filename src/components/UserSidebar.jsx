import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserSidebar.css";

export default function UserSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay to close when clicking outside */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`user-sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="user-logo">SafeReturn User</h2>

        <nav className="user-nav">
          <Link to="/matches" className="user-link" onClick={onClose}>
            🧩 Matched Items
          </Link>
          <Link to="/notifications" className="user-link" onClick={onClose}>
            🔔 Notifications
          </Link>
          <Link to="/history" className="user-link" onClick={onClose}>
            🕓 History
          </Link>
          <Link to="/feedback" className="user-link" onClick={onClose}>
            💬 Feedback
          </Link>
          <Link to="/contact" className="user-link" onClick={onClose}>
            📞 Contact
          </Link>
          <Link to="/profile" className="user-link" onClick={onClose}>
            👤 Profile
          </Link>
        </nav>

        <button
          className="user-logout"
          onClick={() => {
            navigate("/login");
            onClose();
          }}
        >
          🚪 Logout
        </button>
      </aside>
    </>
  );
}
