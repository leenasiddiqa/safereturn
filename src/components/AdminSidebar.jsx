import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
import logo from "../assets/logo.jpg";
import { useAuth } from "../AuthContext";
export default function AdminSidebar() {
  const navigate = useNavigate();
const { logout } = useAuth(); 
const handleLogout = () => {
    logout();  // ✅ Clear localStorage and user state
  };
  return (
    <aside className="admin-sidebar">
      <h2 className="admin-logo">
        
        <img
          src={logo}
          alt="Logo"
          className="admin-logo-img"
        />SafeReturn Admin</h2>
      <nav className="admin-nav">
        <Link to="/admin" className="admin-link">
          🏠 Dashboard
        </Link>
        <Link to="/admin/claims" className="admin-link">
          📋 Manage Claims
        </Link>
        <Link to="/admin/donation" className="admin-link">
          💰 Donations
        </Link>
        <button className="admin-logout" onClick={handleLogout}>
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}
