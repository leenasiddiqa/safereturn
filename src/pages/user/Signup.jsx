import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import "./Signup.css";

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // OTP states
  const [step, setStep] = useState("signup");
  const [tempFormData, setTempFormData] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  //  TIMER FOR AUTO-HIDE MESSAGES
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
  //  Send OTP with validation
const sendOTP = async (formData) => {
  const { username, sapid, password, name, phone } = formData;
  setLoading(true);
  setError("");

  console.log("🔍 1. sendOTP called for:", username); 
  
  try {
    console.log("🔍 2. Calling check-email...");  
    const checkRes = await fetch("http://localhost:5000/api/signup/check-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: username })
    });
    console.log("🔍 3. check-email response status:", checkRes.status); 
    const checkData = await checkRes.json();
    console.log("🔍 4. checkData:", checkData); 
    
    if (checkData.exists) {
      setError("Email already registered. Please use a different email.");
      setLoading(false);
      return;
    }
  } catch (err) {
    console.log("🔍 5. Check failed:", err);
  }
  
    // SAP ID validation
    const sapidRegex = /^(?:f\d{5}|\d{5})$/;
    if (!sapidRegex.test(sapid)) {
      setError("SAP ID must be 5 digits (e.g., 46416) or f + 5 digits (e.g., f12345)");
      setLoading(false);
      return;
    }
    
    // UPDATED EMAIL VALIDATION (Student + Faculty)
    const isFacultySapId = sapid.startsWith('f');

    if (isFacultySapId) {
      // Faculty domain @riphah.edu.pk
      const facultyEmailRegex = /^[^\s@]+@riphah\.edu\.pk$/;
      if (!facultyEmailRegex.test(username)) {
        setError("Use your Riphah email: name@riphah.edu.pk");
        setLoading(false);
        return;
      }
      console.log("✅ Faculty email validation passed.");
    } else {
      // For Student: Exact match with sapid@students.riphah.edu.pk
      const studentEmailRegex = /^[^\s@]+@students\.riphah\.edu\.pk$/;
      if (!studentEmailRegex.test(username)) {
        setError("Use your Riphah student email: sapid@students.riphah.edu.pk");
        setLoading(false);
        return;
      }
      
      const emailSapid = username.split('@')[0];
      if (emailSapid !== sapid) {
        setError("SAP ID does not match with email SAP ID");
        setLoading(false);
        return;
      }
      console.log("✅ Student email validation passed.");
    }
    
    
    // Name validation
    if (!name || name.length < 2) {
      setError("Please enter your full name");
      setLoading(false);
      return;
    }
    
    //  Phone validation
    const phoneRegex = /^\d{11}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number must be 11 digits");
      setLoading(false);
      return;
    }
    
   //  Password validation
if (!password) {
  setError("Password is required");
  setLoading(false);
  return;
}

    // send otp
    console.log("📧 Sending OTP to email:", username);
    
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/otp/send-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username })
      });
      const data = await res.json();
      
      if (data.success) {
        setTempFormData({ email: username, username, password, name, phone, sapid });
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

  //  Verify OTP and complete signup
  const verifyOTPAndSignup = async () => {
     if (!otp || otp.trim() === "") {
    setOtpError("Please enter OTP");
    return;
  }
    setLoading(true);
    setOtpError("");
console.log("📤 Sending to backend:", {
    email: tempFormData.email,
    otp,
    username: tempFormData.username,
    password: tempFormData.password,
    name: tempFormData.name,
    cnic: "",
    phone: tempFormData.phone
  });

    try {
      const res = await fetch("http://localhost:5000/api/otp/verify-signup-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: tempFormData.email,
          otp,
          username: tempFormData.username,
          password: tempFormData.password,
          name: tempFormData.name,
          cnic: "",
          phone: tempFormData.phone
        })
      });
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

  async function handleSignup(formData) {
    console.log("🟢 handleSignup called with:", formData); 
    await sendOTP(formData);
  }

  // OTP verification screen
  if (step === "otp") {
    return (
      <div className="signup-background" style={{ background: "#f0f4f8" }}>
       <div className="signup-form" style={{ background: "#11315b",  borderRadius: "24px", padding: "40px 36px", width: "480px", maxWidth: "100%", border: "2px solid #e68a62" }}>
          <h2 style={{ color: "#fff", textAlign: "center", marginBottom: "20px" }}>Verify Email</h2>
           <p style={{ textAlign: "center", color: "#cbd5e0", marginBottom: "20px" }}>
          OTP sent to {tempFormData?.email}
        </p>

          {otpError && <div className="notice success" style={{ backgroundColor: "#c7704f", fontWeight: "bold", color: "white", border: "1px solid" }}>{otpError}</div>}
          {success && <div className="notice success">{success}</div>}

          <label>Enter OTP *</label>
          <input 
            type="text" 
            placeholder="Enter 6-digit OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            disabled={loading}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

         <button 
          onClick={verifyOTPAndSignup} 
          disabled={loading} 
          style={{ width: "100%", padding: "14px", backgroundColor: "#E68A62", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "600", fontSize: "16px", cursor: "pointer", marginBottom: "0px " }}
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
          style={{ width: "100%", padding: "14px",  color: "#fff", border: "1px solid #E68A62", borderRadius: "12px", fontWeight: "600", fontSize: "16px", cursor: "pointer" }}
        >
          Back
        </button>
          
        </div>
      </div>
    );
  }

  // Signup form
  return (
    <div className="signup-background">
      <div className="signup-form">
        <h2>Create Your Account</h2>
        <p style={{ textAlign: "center", color: "#607080", marginBottom: "20px" }}>
          Join us and start your journey today
        </p>

        {success && <div className="notice success">{success}</div>}
        {error && <div className="notice success" style={{ backgroundColor: "#c7704f", color: "white", border: "1px solid", fontWeight: "bold" }}>{error}</div>}

        <AuthForm
          mode="signup"
          onSubmit={handleSignup}
          loading={loading}
          error={error}
        />

        <div className="footer-text">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}