import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminSidebar.css";
<<<<<<< HEAD
import logo from "../assets/logo.jpg";
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">
<<<<<<< HEAD
      <h2 className="admin-logo">
        
        <img
          src={logo}
          alt="Logo"
          className="admin-logo-img"
        />SafeReturn Admin</h2>
=======
      <h2 className="admin-logo">SafeReturn Admin</h2>
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      <nav className="admin-nav">
        <Link to="/admin" className="admin-link">
          🏠 Dashboard
        </Link>
        <Link to="/admin/claims" className="admin-link">
          📋 Manage Claims
        </Link>
<<<<<<< HEAD
        <Link to="/admin/donation" className="admin-link">
=======
        <Link to="/donation" className="admin-link">
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          💰 Donations
        </Link>
        <button className="admin-logout" onClick={() => navigate("/login")}>
          🚪 Logout
        </button>
      </nav>
    </aside>
  );
}
