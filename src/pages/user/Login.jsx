import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
<<<<<<< HEAD
import "./Login.css";
=======
import "./Login.css"; // make sure this file contains your CSS
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
<<<<<<< HEAD
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
=======
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLogin({ username, password }) {
    setLoading(true);
    const res = login(username, password);
    setLoading(false);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message || "Login failed");
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    }
  }

  return (
    <div className="login-background">
      <div className="login-form">
        <h2>Welcome Back</h2>
<<<<<<< HEAD
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
=======
        <p
          style={{
            textAlign: "center",
            color: "#607080",
            marginBottom: "20px",
          }}
        >
          Please sign in to your account
        </p>

        <AuthForm
          mode="login"
          onSubmit={handleLogin}
          loading={loading}
          error={error}
        />
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

        {error && <p className="error">{error}</p>}

        <div className="footer-text">
<<<<<<< HEAD
          Don't have an account? <Link to="/signup">Sign up</Link>
=======
          Don’t have an account? <Link to="/signup">Sign up</Link>
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
