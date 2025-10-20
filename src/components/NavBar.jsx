import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./NavBar.css"; // keep your navbar styles

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="brand">SafeReturn</div>
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
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>

      {/* Sidebar component */}
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
