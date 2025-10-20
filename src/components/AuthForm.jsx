import React, { useState } from "react";

export default function AuthForm({ mode, onSubmit, loading, error }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
    name: "",
    cnic: "",
    phone: "",
  });
  const [touched, setTouched] = useState({});

  const isSignup = mode === "signup";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleBlur(e) {
    setTouched({ ...touched, [e.target.name]: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (isSignup && form.password !== form.confirm) return;
    onSubmit(form);
  }

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

  return (
    <form className="form" onSubmit={handleSubmit} autoComplete="off">
      {isSignup && (
        <>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {nameError && <span className="notice">{nameError}</span>}
          </label>
          <label>
            CNIC
            <input
              name="cnic"
              value={form.cnic}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={13}
              minLength={13}
              pattern="\d{13}"
            />
            {cnicError && <span className="notice">{cnicError}</span>}
          </label>
          <label>
            Phone Number
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              maxLength={11}
              minLength={11}
              pattern="\d{11}"
            />
            {phoneError && <span className="notice">{phoneError}</span>}
          </label>
        </>
      )}
      <label>
        Username
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {usernameError && <span className="notice">{usernameError}</span>}
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {passwordError && <span className="notice">{passwordError}</span>}
      </label>
      {isSignup && (
        <label>
          Confirm Password
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          {confirmError && <span className="notice">{confirmError}</span>}
        </label>
      )}
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
      >
        {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
}
