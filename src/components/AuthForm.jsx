import React, { useState } from "react";

export default function AuthForm({ mode, onSubmit, loading, error }) {
  const [form, setForm] = useState({
    sapid: "", 
    username: "",
    password: "",
    confirm: "",
    name: "",
    cnic: "",
    phone: "",
  });
  const [touched, setTouched] = useState({});
  const [showErrors, setShowErrors] = useState(false);

  const isSignup = mode === "signup";

  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === 'sapid') {
      // ✅ SAP ID mein sirf 1 letter + 5 digits ya 5 digits only allow karo
      const alphanumeric = value.replace(/[^a-zA-Z0-9]/g, '');
      
      // Agar pehla character letter hai, toh exactly 6 characters tak allow karo (1 letter + 5 digits)
      // Agar pehla character digit hai, toh exactly 5 digits tak allow karo
      let truncated;
      if (alphanumeric.length > 0 && /[a-zA-Z]/.test(alphanumeric[0])) {
        truncated = alphanumeric.slice(0, 6); // f46416 format (6 characters)
      } else {
        truncated = alphanumeric.slice(0, 5); // 46416 format (5 characters)
      }
      
      setForm({ ...form, [name]: truncated });
    } 
    else if (name === 'cnic' || name === 'phone') {
      // Sirf digits rakho
      const digitsOnly = value.replace(/\D/g, '');
      setForm({ ...form, [name]: digitsOnly });
    } 
    else if (name === 'name') {
      // Name mein sirf letters, spaces aur basic characters allow karo
      const lettersOnly = value.replace(/[^a-zA-Z\s.'-]/g, '');
      setForm({ ...form, [name]: lettersOnly });
    }
    else {
      setForm({ ...form, [name]: value });
    }
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowErrors(true);
    
    // Check if form is valid
    if (!isFormValid) {
      return;
    }
    
    console.log("📱 Final form data:", form);
    if (isSignup && form.password !== form.confirm) return;
    onSubmit(form);
  }

  // ✅ VALIDATION FUNCTIONS (only show after submit attempt)
  const sapidError =
    showErrors && isSignup && (!form.sapid || !/^(?:[a-zA-Z]\d{5}|\d{5})$/.test(form.sapid))
      ? "SAP ID must be either 'f46416' format (1 letter + 5 digits) or '46416' format (5 digits only)"
      : "";

  const usernameError =
    showErrors && (!form.username || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.username))
      ? "Valid email address required"
      : "";

  const passwordError =
    showErrors && (!form.password || form.password.length < 6)
      ? "Password must be at least 6 characters"
      : "";

  const confirmError =
    showErrors && isSignup && form.password !== form.confirm
      ? "Passwords do not match"
      : "";

  const nameError =
    showErrors && isSignup && (!form.name || !/^[a-zA-Z\s.'-]{2,}$/.test(form.name))
      ? "Valid name required (letters only)"
      : "";

  const cnicError =
    showErrors && isSignup && (!form.cnic || !/^\d{13}$/.test(form.cnic))
      ? "Valid 13-digit CNIC required"
      : "";

  const phoneError =
    showErrors && isSignup && (!form.phone || !/^\d{11}$/.test(form.phone))
      ? "Valid 11-digit phone required"
      : "";

  // ✅ CHECK IF FORM IS VALID
  const isFormValid = 
    !sapidError &&
    !usernameError &&
    !passwordError &&
    !confirmError &&
    !nameError &&
    !cnicError &&
    !phoneError &&
    form.username &&
    form.password &&
    (isSignup ? (form.sapid && form.name && form.cnic && form.phone && form.confirm) : true);

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      {isSignup && (
        <>
          {/* ✅ SAP ID FIELD - SABSE PEHLE */}
          <label>
            SAP ID <span className="required-star">*</span>
            <input
              name="sapid"
              value={form.sapid}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={6}
              placeholder="Enter sap id"
              pattern="^([a-zA-Z]\d{5}|\d{5})$" // ✅ HTML5 pattern for exact validation
              title="Must be exactly 5 digits OR 1 letter followed by 5 digits"
            />
            {sapidError && <span className="notice">{sapidError}</span>}
          </label>

          <label>
            Full Name <span className="required-star">*</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={50}
              placeholder="Enter your full name"
              pattern="[a-zA-Z\s.'-]+"
              title="Only letters, spaces, and basic punctuation allowed"
            />
            {nameError && <span className="notice">{nameError}</span>}
          </label>

          <label>
            CNIC <span className="required-star">*</span>
            <input
              name="cnic"
              value={form.cnic}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={13}
              placeholder="13-digit CNIC without dashes"
              inputMode="numeric"
            />
            {cnicError && <span className="notice">{cnicError}</span>}
          </label>

          <label>
            Phone Number <span className="required-star">*</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={11}
              placeholder="11-digit phone number"
              inputMode="numeric"
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
          onBlur={handleBlur}
          required
          placeholder="your.email@example.com"
        />
        {usernameError && <span className="notice">{usernameError}</span>}
      </label>

      <label>
        Password <span className="required-star">*</span>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          maxLength={6}
          placeholder="Enter only  6 characters"
        />
        {passwordError && <span className="notice">{passwordError}</span>}
      </label>

      {isSignup && (
        <label>
          Confirm Password <span className="required-star">*</span>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            minLength={6}
            placeholder="Confirm your password"
          />
          {confirmError && <span className="notice">{confirmError}</span>}
        </label>
      )}

      {error && <div className="notice error-message">{error}</div>}

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
}