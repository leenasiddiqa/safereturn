import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">SafeReturn Admin</h2>
      <nav className="admin-nav">
        <Link to="/admin" className="admin-link">
          🏠 Dashboard
        </Link>
        <Link to="/admin/claims" className="admin-link">
          📋 Manage Claims
        </Link>
        <Link to="/donation" className="admin-link">
          💰 Donations
        </Link>
        <button className="admin-logout" onClick={() => navigate("/login")}>
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}
