import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import "./Login.css";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin({ username, password }) {
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("🔄 Login process started...");
      
      const res = await login(username, password);
      console.log("📨 Login result:", res);
      
      if (res.success) {
        // ✅ Success message set karen
        setSuccess("✅ Login successful!");
        
        // ✅ Thoda delay karke navigate karen taaki user success message dekh sake
        setTimeout(() => {
          // ✅ CHECK USER ROLE (res.user use karen)
          if (res.user && res.user.role === "admin") {
            navigate("/admin"); // ✅ Admin dashboard
          } else {
            navigate("/main"); // ✅ User dashboard
          }
        }, 1000);
        
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      console.error("❌ Login catch error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-background">
      <div className="login-form">
        <h2>Welcome Back</h2>
        <p style={{ textAlign: "center", color: "#607080", marginBottom: "20px" }}>
          Please sign in to your account
        </p>

        {success && (
          <div className="notice success">
            {success}
          </div>
        )}

        {/* ✅ Custom form without email validation for admin */}
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const username = formData.get('username');
          const password = formData.get('password');
          handleLogin({ username, password });
        }}>
          <label>
            Username *
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </label>

          <label>
            Password *
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="footer-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}