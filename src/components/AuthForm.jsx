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

  // ---------- Input Formatting ----------
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "sapid") {
      const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, "");
      let truncated;
      if (alphanumeric.length > 0 && /f/.test(alphanumeric[0])) {
        truncated = alphanumeric.slice(0, 6);
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

  // ---------- Validation ----------
  const sapidError =
    showErrors &&
    isSignup &&
    (!form.sapid || !/^(?:f\d{5}|\d{5})$/.test(form.sapid))
      ? "Enter your 5-digit or 6-digit SAP ID (e.g.46416 or f46416)"
      : "";

  // Sirf email format check
  const usernameError =
    showErrors &&
    (!form.username ||
      !/^[^\s@]+@students\.riphah\.edu\.pk$/.test(form.username))
      ? "Use your Riphah email: sapid@students.riphah.edu.pk"
      : "";

  // SAP mismatch error (tab dikhega jab email format sahi ho)
  const sapMismatchError =
    showErrors &&
    isSignup &&
    form.username &&
    form.sapid &&
    /^[^\s@]+@students\.riphah\.edu\.pk$/.test(form.username) &&
    form.username.split('@')[0] !== form.sapid
      ? "SAP ID does not match with email SAP ID"
      : "";

  // Email field ke liye final error (pehle format error, phir mismatch error)
  const emailError = usernameError || sapMismatchError;

const passwordError = () => {
  if (!showErrors) return "";
  if (!form.password) return "";
  
  // Length check
  if (form.password.length < 8) {
    return "Use at least 8 characters";
  }
  
  // Letters check (A-Z or a-z)
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
    !usernameError &&
    !sapMismatchError &&
    !passwordError() &&
    !confirmError &&
    !nameError &&
    !phoneError &&
    form.username &&
    form.password &&
    (isSignup ? form.sapid && form.name && form.phone && form.confirm : true);

  function handleSubmit(e) {
    e.preventDefault();
    setShowErrors(true);
    if (!isFormValid) return;

    const { confirm, ...signupData } = form;
    onSubmit(signupData);
  }

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      {isSignup && (
        <>
          <label>
            SAP ID <span className="required-star">*</span>
            <input
              name="sapid"
              value={form.sapid}
              onChange={handleChange}
              required
              maxLength={6}
              placeholder="Enter sap id"
            />
            {sapidError && <span className="notice">{sapidError}</span>}
          </label>

          <label>
            Full Name <span className="required-star">*</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={25}
              placeholder="Enter your full name"
            />
            {nameError && <span className="notice">{nameError}</span>}
          </label>

          <label>
            Phone Number <span className="required-star">*</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              maxLength={11}
              placeholder="11-digit phone number"
            />
            {phoneError && <span className="notice">{phoneError}</span>}
          </label>
        </>
      )}

      <label>
        Email <span className="required-star">*</span>
        <input
          name="username"
          type="email"
          value={form.username}
          onChange={handleChange}
          required
          placeholder="sapid@students.riphah.edu.pk"
        />
        {emailError && <span className="notice">{emailError}</span>}
      </label>

      <div style={{ display: "flex", gap: "16px", width: "100%" }}>
        <div style={{ flex: 1 }}>
          <label>
            Password*
            <div
              className="password-container"
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: "8px",
              }}
            >
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                 maxLength={15}
                className="password-input"
                style={{ flex: 1, width: "100%" }}
              />
              <span className="toggle-icon" onClick={togglePassword}>
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {passwordError() && <span className="notice">{passwordError()}</span>}
          </label>
        </div>

        {isSignup && (
          <div style={{ flex: 1 }}>
            <label>
              Confirm Password <span className="required-star">*</span>
              <div
                className="password-container"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "8px",
                }}
              >
                <input
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="password-input"
                  style={{ flex: 1, width: "100%" }}
                />
                <span className="toggle-icon" onClick={toggleConfirmPassword}>
                  {showConfirmPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {confirmError && <span className="notice">{confirmError}</span>}
            </label>
          </div>
        )}
      </div>

      
      <button type="submit" disabled={loading}>
        {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}