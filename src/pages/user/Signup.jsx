// src/pages/Signup/Signup.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

// Import eye icons
import EyeIcon from "../../icons/EyeIcon";
import EyeOffIcon from "../../icons/EyeOffIcon";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form fields state
  const [username, setUsername] = useState("");
  const [sapid, setSapid] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // OTP states
  const [step, setStep] = useState("signup");
  const [tempFormData, setTempFormData] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Auto-hide messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (otpError) {
      const timer = setTimeout(() => setOtpError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [otpError]);

  const togglePassword = () => setShowPassword(!showPassword);

  // Send OTP with validation (unchanged)
  const sendOTP = async (formData) => {
    const { username, sapid, password, name, phone } = formData;
    setLoading(true);
    setError("");

    console.log("🔍 1. sendOTP called for:", username);
    try {
      console.log("🔍 2. Calling check-email...");
      const checkRes = await fetch(
        "http://localhost:5000/api/signup/check-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: username }),
        },
      );
      const checkData = await checkRes.json();
      if (checkData.exists) {
        setError("Email already registered. Please use a different email.");
        setLoading(false);
        return;
      }
    } catch (err) {
      console.log("🔍 Check failed:", err);
    }

    // SAP ID validation
    const sapidRegex = /^(?:f\d{4}|\d{5})$/;
    if (!sapidRegex.test(sapid)) {
      setError("Enter valid sap id");
      setLoading(false);
      return;
    }

    const isFacultySapId = sapid.startsWith("f");
    if (isFacultySapId) {
      const facultyEmailRegex = /^[^\s@]+@riphah\.edu\.pk$/;
      if (!facultyEmailRegex.test(username)) {
        setError("Use your Riphah email: name@riphah.edu.pk");
        setLoading(false);
        return;
      }
    } else {
      const studentEmailRegex = /^[^\s@]+@students\.riphah\.edu\.pk$/;
      if (!studentEmailRegex.test(username)) {
        setError("Use your Riphah student email: sapid@students.riphah.edu.pk");
        setLoading(false);
        return;
      }
      const emailSapid = username.split("@")[0];
      if (emailSapid !== sapid) {
        setError("SAP ID does not match with email SAP ID");
        setLoading(false);
        return;
      }
    }

    if (!name || name.length < 2) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }

    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 11 digits");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    console.log("📧 Sending OTP to email:", username);
    try {
      const res = await fetch("http://localhost:5000/api/otp/send-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username }),
      });
      const data = await res.json();
      if (data.success) {
        setTempFormData({
          email: username,
          username,
          password,
          name,
          phone,
          sapid,
        });
        setStep("otp");
        setSuccess("OTP sent to your email!");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and signup (unchanged)
  const verifyOTPAndSignup = async () => {
    if (!otp || otp.trim() === "") {
      setOtpError("Please enter OTP");
      return;
    }
    setLoading(true);
    setOtpError("");
    try {
      const res = await fetch(
        "http://localhost:5000/api/otp/verify-signup-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: tempFormData.email,
            otp,
            username: tempFormData.username,
            password: tempFormData.password,
            name: tempFormData.name,
            sapid: tempFormData.sapid,
            phone: tempFormData.phone,
          }),
        },
      );
      const data = await res.json();
      if (data.success) {
        setSuccess("🎉 Signup successful! Please login now.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setOtpError(data.message);
      }
    } catch (err) {
      setOtpError("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (!tempFormData?.email) {
      setOtpError("No email found. Please go back and try again.");
      return;
    }
    setLoading(true);
    setOtpError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/otp/send-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: tempFormData.email }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("✅ OTP resent to your email!");
      } else {
        setOtpError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setOtpError("Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  async function handleSignup(e) {
    e.preventDefault();
    const formData = { username, sapid, password, name, phone };
    await sendOTP(formData);
  }

  // OTP verification screen (unchanged except minor styling)
  if (step === "otp") {
    return (
      <div className="signup-background" style={{ background: "#f0f4f8" }}>
        <div
          className="signup-form"
          style={{
            background: "#11315b",
            borderRadius: "24px",
            padding: "40px 36px",
            width: "480px",
            maxWidth: "100%",
            border: "2px solid #e68a62",
          }}
        >
          <h2
            style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}
          >
            Verify Email
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#cbd5e0",
              marginBottom: "20px",
            }}
          >
            OTP sent to {tempFormData?.email}
          </p>
          {otpError && <div className="signup-toast-error">{otpError}</div>}
          {success && <div className="signup-toast-success">{success}</div>}
          <label
            style={{
              color: "#fff",
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Enter OTP *
          </label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="otp-input"
            style={{ marginBottom: "20px", marginTop: "8px" }}
          />
          <button
            onClick={verifyOTPAndSignup}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              backgroundColor: "#E68A62",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              marginBottom: "0px",
            }}
          >
            {loading ? "Verifying..." : "Verify & Sign Up"}
          </button>
          <button
            onClick={() => {
              setStep("signup");
              setSuccess("");
              setOtpError("");
            }}
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              color: "#fff",
              border: "1px solid #E68A62",
              borderRadius: "12px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Back
          </button>
          <div
            style={{
              textAlign: "center",
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            <span
              onClick={resendOTP}
              style={{
                color: "#E68A62",
                fontSize: "14px",
                cursor: "pointer",
                textDecoration: "underline",
                fontWeight: "500",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#c55a3a")}
              onMouseLeave={(e) => (e.target.style.color = "#E68A62")}
            >
              {loading ? "Sending..." : "Resend OTP"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Signup form with eye toggle
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

        {success && <div className="signup-toast-success">{success}</div>}
        {error && <div className="signup-toast-error">{error}</div>}

        <form onSubmit={handleSignup}>
          <label>Email / Username *</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="sapid@students.riphah.edu.pk or name@riphah.edu.pk"
            required
            disabled={loading}
          />

          <label>SAP ID *</label>
          <input
            type="text"
            value={sapid}
            onChange={(e) => setSapid(e.target.value)}
            placeholder="e.g., 12345 or f2021"
            required
            disabled={loading}
          />

          <label>Full Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            required
            disabled={loading}
          />

          <label>Phone Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="11 digits (e.g., 03123456789)"
            required
            disabled={loading}
          />

          <label>Password *</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              disabled={loading}
              style={{ paddingRight: "40px" }}
            />
            <span
              onClick={togglePassword}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? (
                <EyeOffIcon
                  style={{ width: "20px", height: "20px", color: "#aaa" }}
                />
              ) : (
                <EyeIcon
                  style={{ width: "20px", height: "20px", color: "#aaa" }}
                />
              )}
            </span>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending OTP..." : "Sign Up"}
          </button>
        </form>

        <div className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
