import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserSidebar.css";
import logo from "../assets/logo.jpg";
export default function UserSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  return (
    <>
      {isOpen && <div className="user-sidebar-overlay" onClick={onClose}></div>}

       <aside className={`user-sidebar ${isOpen ? "open" : ""}`}
       >
        <div className="user-logo">
          <img src={logo} alt="Logo" className="user-logo-img" />
          <span>SafeReturn User</span>
        </div>
        <nav className="user-nav">
          <Link to="/matches" className="user-link" onClick={onClose}>
             Matched Items
          </Link>
          <Link to="/notifications" className="user-link" onClick={onClose}>
             Notifications
          </Link>
          <Link to="/history" className="user-link" onClick={onClose}>
             History
          </Link>
          <Link to="/feedback" className="user-link" onClick={onClose}>
             Feedback
          </Link>
          <Link to="/contact" className="user-link" onClick={onClose}>
             Contact
          </Link>
          <Link to="/profile" className="user-link" onClick={onClose}>
             Profile
          </Link>
        </nav>
      </aside>
    </>
  );
}
