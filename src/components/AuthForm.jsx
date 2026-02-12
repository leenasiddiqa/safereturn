import React, { useState } from "react";

export default function AuthForm({ mode, onSubmit, loading, error }) {
  const [form, setForm] = useState({
<<<<<<< HEAD
    sapid: "", 
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    username: "",
    password: "",
    confirm: "",
    name: "",
    cnic: "",
    phone: "",
  });
  const [touched, setTouched] = useState({});
<<<<<<< HEAD
  const [showErrors, setShowErrors] = useState(false);
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

  const isSignup = mode === "signup";

  function handleChange(e) {
<<<<<<< HEAD
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
=======
    setForm({ ...form, [e.target.name]: e.target.value });
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    setShowErrors(true);
    
    // Check if form is valid
    if (!isFormValid) {
      return;
    }
    
    console.log("📱 Final form data:", form);
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
    if (isSignup && form.password !== form.confirm) return;
    onSubmit(form);
  }

<<<<<<< HEAD
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

=======
  const usernameError =
    touched.username && !form.username ? "Username required" : "";
  const passwordError =
    touched.password && !form.password ? "Password required" : "";
  const confirmError =
    isSignup && touched.confirm && form.password !== form.confirm
      ? "Passwords do not match"
      : "";
  const nameError =
    isSignup && touched.name && !form.name ? "Name required" : "";
  const cnicError =
    isSignup && touched.cnic && !/^\d{13}$/.test(form.cnic)
      ? "Valid 13-digit CNIC required"
      : "";
  const phoneError =
    isSignup && touched.phone && !/^\d{11}$/.test(form.phone)
      ? "Valid 11-digit phone required"
      : "";

>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      {isSignup && (
        <>
<<<<<<< HEAD
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
=======
          <label>
            Name
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
<<<<<<< HEAD
              maxLength={50}
              placeholder="Enter your full name"
              pattern="[a-zA-Z\s.'-]+"
              title="Only letters, spaces, and basic punctuation allowed"
            />
            {nameError && <span className="notice">{nameError}</span>}
          </label>

          <label>
            CNIC <span className="required-star">*</span>
=======
            />
            {nameError && <span className="notice">{nameError}</span>}
          </label>
          <label>
            CNIC
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
            <input
              name="cnic"
              value={form.cnic}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={13}
<<<<<<< HEAD
              placeholder="13-digit CNIC without dashes"
              inputMode="numeric"
            />
            {cnicError && <span className="notice">{cnicError}</span>}
          </label>

          <label>
            Phone Number <span className="required-star">*</span>
=======
              minLength={13}
              pattern="\d{13}"
            />
            {cnicError && <span className="notice">{cnicError}</span>}
          </label>
          <label>
            Phone Number
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={11}
<<<<<<< HEAD
              placeholder="11-digit phone number"
              inputMode="numeric"
=======
              minLength={11}
              pattern="\d{11}"
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
            />
            {phoneError && <span className="notice">{phoneError}</span>}
          </label>
        </>
      )}
<<<<<<< HEAD

      <label>
        Email <span className="required-star">*</span>
        <input
          name="username"
          type="email"
=======
      <label>
        Username
        <input
          name="username"
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
          required
<<<<<<< HEAD
          placeholder="your.email@example.com"
        />
        {usernameError && <span className="notice">{usernameError}</span>}
      </label>

      <label>
        Password <span className="required-star">*</span>
=======
        />
        {usernameError && <span className="notice">{usernameError}</span>}
      </label>
      <label>
        Password
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
<<<<<<< HEAD
          maxLength={6}
          placeholder="Enter only  6 characters"
        />
        {passwordError && <span className="notice">{passwordError}</span>}
      </label>

      {isSignup && (
        <label>
          Confirm Password <span className="required-star">*</span>
=======
        />
        {passwordError && <span className="notice">{passwordError}</span>}
      </label>
      {isSignup && (
        <label>
          Confirm Password
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            required
<<<<<<< HEAD
            minLength={6}
            placeholder="Confirm your password"
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          />
          {confirmError && <span className="notice">{confirmError}</span>}
        </label>
      )}
<<<<<<< HEAD

      {error && <div className="notice error-message">{error}</div>}

      <button
        type="submit"
        disabled={loading}
=======
      {error && <div className="notice">{error}</div>}
      <button
        type="submit"
        disabled={
          loading ||
          usernameError ||
          passwordError ||
          confirmError ||
          nameError ||
          cnicError ||
          phoneError
        }
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      >
        {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
