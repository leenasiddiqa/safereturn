import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./NavBar.css";
import { useAuth } from "../AuthContext";
import logo from "../assets/logo.jpg";

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith("/admin");

  // If route is admin, don't show navbar
  if (isAdminRoute) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        {/* Clickable logo + brand */}
        <div
          className="logo-brand"
          onClick={goHome}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img src={logo} alt="SafeReturn Logo" className="navbar-logo" />
          <div className="brand">SafeReturn</div>
        </div>
      </div>

      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/lost">Report Lost</NavLink>
        <NavLink to="/found">Report Found</NavLink>
        <NavLink to="/matches">Matched Items</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/feedback">Feedback</NavLink>

        {user ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>

      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
