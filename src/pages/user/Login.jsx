import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import "./Login.css"; // make sure this file contains your CSS

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
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
    }
  }

  return (
    <div className="login-background">
      <div className="login-form">
        <h2>Welcome Back</h2>
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

        {error && <p className="error">{error}</p>}

        <div className="footer-text">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
