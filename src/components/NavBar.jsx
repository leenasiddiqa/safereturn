import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { NavLink } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import "./NavBar.css"; // keep your navbar styles

export default function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

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
<<<<<<< HEAD
        {/* Logo image */}
        <img
  src={logo}
  alt="SafeReturn Logo"
  className="navbar-logo"
/>

=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
        <div className="brand">SafeReturn</div>
      </div>

      <nav>
<<<<<<< HEAD
        <NavLink to="/" end>Home</NavLink>
=======
        <NavLink to="/" end>
          Home
        </NavLink>
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
        <NavLink to="/lost">Report Lost</NavLink>
        <NavLink to="/found">Report Found</NavLink>
        <NavLink to="/matches">Matched Items</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/feedback">Feedback</NavLink>
<<<<<<< HEAD
        
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
=======
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </nav>

      {/* Sidebar component */}
      <UserSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </header>
  );
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
