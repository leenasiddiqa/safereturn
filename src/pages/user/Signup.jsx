import { useState } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
<<<<<<< HEAD
import "./Signup.css";
=======
import "./Signup.css"; // 👈 Import your separate CSS file
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
<<<<<<< HEAD
  const [success, setSuccess] = useState(""); // ✅ Success state add ki
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(formData) {
    const { sapid, username, password, name, cnic, phone } = formData;
    console.log("🔄 SIGNUP HANDLER DATA:", { 
      sapid, username, name, cnic, phone 
    });
  
    setLoading(true);
    setError("");
    setSuccess(""); // ✅ Success message reset karo

    try {
      const result = await signup(sapid, username, password, name, cnic, phone);
      
      if (result.success) {
        setSuccess("🎉 Signup successful! Please login now."); // ✅ Custom success message
        
        // ✅ Thoda delay karke login page par navigate karo
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        
      } else {
        setError(result.message || "Signup failed");
      }
    } catch (err) {
      setError("Signup failed! Please try again!");
    } finally {
      setLoading(false);
=======
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
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    }
  }

  return (
    <div className="signup-background">
      <div className="signup-form">
        <h2>Create Your Account</h2>
<<<<<<< HEAD
        <p style={{ textAlign: "center", color: "#607080", marginBottom: "20px" }}>
          Join us and start your journey today
        </p>

        {/* ✅ Success notification */}
        {success && (
          <div className="notice success">
            {success}
          </div>
        )}

=======
        <p
          style={{
            textAlign: "center",
            color: "#607080",
            marginBottom: "20px",
          }}
        >
          Join us and start your journey today
        </p>

>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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
<<<<<<< HEAD
}
=======
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
