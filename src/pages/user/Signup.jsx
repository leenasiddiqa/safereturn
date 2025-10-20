import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import "./Signup.css"; // 👈 Import your separate CSS file

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSignup({ username, password, name, cnic, phone }) {
    setLoading(true);
    const res = signup(username, password, name, cnic, phone);
    setLoading(false);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message || "Signup failed");
    }
  }

  return (
    <div className="signup-background">
      <div className="signup-form">
        <h2>Create Your Account</h2>
        <p
          style={{
            textAlign: "center",
            color: "#607080",
            marginBottom: "20px",
          }}
        >
          Join us and start your journey today
        </p>

        <AuthForm
          mode="signup"
          onSubmit={handleSignup}
          loading={loading}
          error={error}
        />

        {error && <p className="error">{error}</p>}

        <div className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
