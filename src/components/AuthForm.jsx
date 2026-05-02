import React, { useState } from "react";

export default function AuthForm({ mode, onSubmit, loading, error }) {
  const [form, setForm] = useState({
    sapid: "",
    username: "",
    password: "",
    confirm: "",
    name: "",
    phone: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isSignup = mode === "signup";

  // Input Formatting
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "sapid") {
      const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, "");
      let truncated;
      if (alphanumeric.length > 0 && /f/.test(alphanumeric[0])) {
        truncated = alphanumeric.slice(0, 5);
      } else {
        truncated = alphanumeric.slice(0, 5);
      }
      setForm({ ...form, [name]: truncated });
    } else if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "");
      setForm({ ...form, [name]: digitsOnly });
    } else if (name === "name") {
      const lettersOnly = value.replace(/[^a-zA-Z\s.'-]/g, "");
      setForm({ ...form, [name]: lettersOnly });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  // Validation 
  const sapidError =
    showErrors &&
    isSignup &&
    (!form.sapid || !/^(?:f\d{4}|\d{5})$/.test(form.sapid))
      ? "Enter valid SAP ID"
      : "";

  // only check email format
  const usernameError = () => {
  if (!showErrors) return "";
  if (!form.username) return "";
  
  const email = form.username;
  const sapid = form.sapid;
  
  // Faculty check (if SAP ID starts with f)
  if (sapid && sapid.startsWith('f')) {
    if (!/^[^\s@]+@riphah\.edu\.pk$/.test(email)) {
      return "Enter valid faculty email";
    }
    return "";
  }
  
  // Student check
  if (!/^[^\s@]+@students\.riphah\.edu\.pk$/.test(email)) {
    return "Enter valid student email";
  }
  
  return "";
};

  // SAP mismatch error 
  const sapMismatchError = () => {
  if (!showErrors || !isSignup || !form.username || !form.sapid) return "";
  
  const email = form.username;
  const sapid = form.sapid;
  const isFacultySapId = sapid.startsWith('f');
  
  // Faculty case: SAP ID starts with f
  if (isFacultySapId) {
    // Check if email is using student domain
    if (/@students\.riphah\.edu\.pk$/.test(email)) {
      return "Use your faculty email: name@riphah.edu.pk";
    }
    return "";
  }
  
  // Student case: Check if email prefix matches SAP ID
  if (/^[^\s@]+@students\.riphah\.edu\.pk$/.test(email)) {
    const emailSapid = email.split('@')[0];
    if (emailSapid !== sapid) {
      return "SAP ID does not match with email SAP ID";
    }
  }
  
  return "";
};

  // Email field final error - combines username format and SAP mismatch errors
  const emailError = usernameError() || sapMismatchError();

const passwordError = () => {
  if (!showErrors) return "";
  if (!form.password) return "Password is required";
  
  // Length check
  if (form.password.length < 8) {
    return "Use at least 8 characters";
  }
  
  // Letters check 
  if (!/[A-Za-z]/.test(form.password)) {
    return "Password must contain at least one letter";
  }
  
  // Number check
  if (!/[0-9]/.test(form.password)) {
    return "Password must contain at least one number";
  }
  
  // Special character check
  if (!/[!@#$%^&*]/.test(form.password)) {
    return "Password must contain at least one special character (!@#$%^&*)";
  }
  
  return "";
};

  const confirmError =
    showErrors && isSignup && form.password !== form.confirm
      ? "Passwords do not match"
      : "";

  const nameError =
    showErrors &&
    isSignup &&
    (!form.name || !/^[a-zA-Z\s.'-]{4,}$/.test(form.name))
      ? "Valid name required (letters only)"
      : "";

  const phoneError =
    showErrors && isSignup && (!form.phone || !/^\d{11}$/.test(form.phone))
      ? "Phone number must be 11 digits"
      : "";

  const isFormValid =
    !sapidError &&
    !usernameError() &&
    !sapMismatchError() &&
    !passwordError() &&
    !confirmError &&
    !nameError &&
    !phoneError &&
    form.username &&
    form.password &&
    (isSignup ? form.sapid && form.name && form.phone && form.confirm : true);

  function handleSubmit(e) {
  e.preventDefault();
  console.log("🟢 Form submitted - 1");
  setShowErrors(true);
  console.log("🟢 showErrors set - 2");
  
  console.log("🟢 isFormValid value:", isFormValid);
  console.log("🟢 sapMismatchError value:", sapMismatchError);
  console.log("🟢 form.sapid:", form.sapid);
  console.log("🟢 form.username:", form.username);
  
  if (!isFormValid) {
    console.log("🔴 Form invalid - returning");
    return;
  }
  console.log("🟢 Form valid - calling onSubmit");
  const { confirm, ...signupData } = form;
  onSubmit(signupData);
}

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off" noValidate>
      {isSignup && (
        <>
        <div className="signup-field">
          <label>
            SAP ID <span className="required-star">*</span></label>
            <input
              name="sapid"
              value={form.sapid}
              onChange={handleChange}
              required
              maxLength={6}
              placeholder="Enter sap id"
            />
            {sapidError && <span className="signup-error">{sapidError}</span>}
</div>
<div className="signup-field">
          <label>
            Full Name <span className="required-star">*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={25}
              placeholder="Enter your full name"
            />
            {nameError && <span className="signup-error">{nameError}</span>}
        
</div>
<div className="signup-field">
          <label>
            Phone Number <span className="required-star">*</span></label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              maxLength={11}
              placeholder="11-digit phone number"
            />
            {phoneError && <span className="signup-error">{phoneError}</span>}
          
          </div>
        </>
      )}
<div className="signup-field">
      <label>
        Email <span className="required-star">*</span></label>
        <input
          name="username"
          type="email"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="sapid@students.riphah.edu.pk"
        />
        {emailError && <span className="signup-error">{emailError}</span>}
      
</div>
<div className="signup-field">
  <div style={{ display: "flex", gap: "16px", width: "100%" }}>
    
    {/* Password Field */}
    <div style={{ flex: 1 }}>
      <label>Password *</label>
      <div className="password-container">
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          maxLength={15}
          className="password-input"
        />
        <span className="toggle-icon" onClick={togglePassword}>
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
      {passwordError() && <span className="signup-error">{passwordError()}</span>}
    </div>

    {/* Confirm Password Field */}
    {isSignup && (
      <div style={{ flex: 1 }}>
        <label>Confirm Password <span className="required-star">*</span></label>
        <div className="password-container">
          <input
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="password-input"
          />
          <span className="toggle-icon" onClick={toggleConfirmPassword}>
            {showConfirmPassword ? "🙈" : "👁️"}
          </span>
        </div>
        {confirmError && <span className="signup-error">{confirmError}</span>}
      </div>
    )}
    
  </div>
</div>
      

      
      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}