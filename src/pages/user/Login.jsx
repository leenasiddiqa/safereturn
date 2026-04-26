import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

 async function handleLogin(e) {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  try {
    if (role === "admin") {
  if (username === "admin123" && password === "admin") {
    const adminUser = {
      id: "admin001",
      username: "admin123",
      name: "Administrator",
      role: "admin"
    };
    
    // ✅ Use sessionStorage (not localStorage)
    sessionStorage.setItem('admin', JSON.stringify(adminUser));
    
    setSuccess("✅ Admin Login successful!");
    setUsername("");
    setPassword("");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1000);
  } else {
    setError("❌ Invalid admin credentials");
    setUsername("");
    setPassword("");
  }
  setLoading(false);
  return;
}
    
    const res = await login(username, password);
    
    if (res.success && res.user && res.user.role === "user") {
      setSuccess("✅ Login successful!");
      setUsername("");
      setPassword("");
      setTimeout(() => {
        navigate("/main");
      }, 1000);
    } else {
      setError("❌ Invalid user credentials");
      setUsername("");
      setPassword("");
    }
  } catch (err) {
    setError("❌ Something went wrong");
    setUsername("");
    setPassword("");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="login-background">
      <div className="login-form">
        <h2>Welcome Back</h2>
        <p style={{ textAlign: "center", color: "#cbd5e0", marginBottom: "20px" }}>
          Please sign in to your account
        </p>

        {/* Role Selection */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginBottom: "20px", alignItems: "center"  }}>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", cursor: "pointer" }}>
            <input
              type="radio"
              name="role"
              value="user"
              checked={role === "user"}
              onChange={(e) => {
                setRole(e.target.value);
                setError("");
                setSuccess("");
              }}
              style={{ width: "16px", height: "16px",margin:"0"}}
            />
            <span style={{ position: "relative", top: "5px" }}>Login as User</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", cursor: "pointer" }}>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={role === "admin"}
              onChange={(e) => {
                setRole(e.target.value);
                setError("");
                setSuccess("");
              }}
              style={{ width: "16px", height: "16px" }}
            />
            <span style={{ position: "relative", top: "5px" }}>Login as Admin</span>
          </label>
        </div>

        {/* Mode Indicator */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <span style={{ 
            background: "#e68a62", 
            padding: "4px 12px", 
            borderRadius: "20px", 
            color: "#fff", 
            fontSize: "12px",
            fontWeight: "bold"
          }}>
            {role === "admin" ? "🔐 ADMIN MODE" : "👤 USER MODE"}
          </span>
        </div>

        {/* ✅ Success & Error Messages - SAME STYLE */}
        {success && (
          <div className="notice success" style={{ 
            backgroundColor: "#e68a62", 
            color: "#fff", 
            padding: "12px 16px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontWeight: "500"
          }}>
            {success}
          </div>
        )}
        
        {error && (
          <div className="notice error" style={{ 
            backgroundColor: "#e68a62", 
            color: "#fff", 
            padding: "12px 16px",
            borderRadius: "10px",
            marginBottom: "20px",
            fontWeight: "600"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label>
            Username *
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={role === "admin" ? "Enter admin username" : "Enter your username"}
              required
              disabled={loading}
              style={{ width: "100%", padding: "14px", borderRadius: "12px", marginBottom: "20px" }}
            />
          </label>

          <label className="form-label">
            Password *
            <div className="password-container" style={{ position: "relative" }}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
                style={{ width: "100%", padding: "14px", borderRadius: "12px" }}
              />
              <span
                className="toggle-icon"
                onClick={togglePassword}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </label>

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", marginTop: "24px", backgroundColor: "#E68A62", border: "none", borderRadius: "12px", color: "#fff", fontWeight: "600", cursor: "pointer" }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {role === "user" && (
          <div className="footer-text" style={{ textAlign: "center", marginTop: "20px", color: "#fff" }}>
            Don't have an account? <Link to="/signup" style={{ color: "#E68A62" }}>Sign up</Link>
          </div>
        )}
      </div>
    </div>
  );
}