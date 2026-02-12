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
  const location = useLocation(); // ✅ Current location check karne ke liye

  // ✅ Check if current route is admin route
  const isAdminRoute = location.pathname.startsWith('/admin');

  // ✅ Agar admin route hai toh NavBar mat show karo
  if (isAdminRoute) {
    return null;
  }

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate("/login");
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
        {/* Logo image */}
        <img
  src={logo}
  alt="SafeReturn Logo"
  className="navbar-logo"
/>

        <div className="brand">SafeReturn</div>
      </div>

      <nav>
        <NavLink to="/" end>Home</NavLink>
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

      {/* UserSidebar - yeh bhi sirf user pages pe hi show hoga */}
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}