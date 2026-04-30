import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [touched, setTouched] = useState({ email: false, message: false }); // ✅ Touch tracking

  //Email validation 
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //  Show message 
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    if (type === 'success') {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'message') {
      //  Message length limit (500 characters)
      const truncatedValue = value.slice(0, 500);
      setForm({ ...form, [name]: truncatedValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  //  Handle blur for validation
  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  //  contact message saved in backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //  Validation checks
    if (!form.email || !form.message) {
      showMessage("⚠️ Please fill all required fields.", "error");
      return;
    }

    if (!validateEmail(form.email)) {
      showMessage("❌ Please enter a valid email address.", "error");
      return;
    }

    if (form.message.length < 4) {
      showMessage("❌ Message must be at least 4 characters long.", "error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const contactData = {
        email: form.email.trim(),
        message: form.message.trim()
      };

      console.log("📤 Sending contact data:", contactData);

      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (result.success) {
        showMessage("✅ " + result.message, "success");
        setForm({ email: "", message: "" }); 
        setTouched({ email: false, message: false }); 
      } else {
        showMessage("❌ " + result.message, "error");
      }
      
    } catch (error) {
      console.error("❌ Contact submit error:", error);
      showMessage("❌ Error sending message: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  //  Validation errors after submit
  const emailError = messageType === 'error' && !validateEmail(form.email) 
    ? "Please enter a valid email address" 
    : "";

  const messageError = messageType === 'error' && form.message.length < 10 
    ? "Message must be at least 4 characters" 
    : "";

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-description">
          For help, questions, or to report an issue, please use the feedback
          form below or email{" "}
          <a href="mailto:support@safereturn.edu.pk" className="contact-link">
            support@safereturn.edu.pk
          </a>
          .
        </p>

        {message && (
          <div className={`notice ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Your Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={loading}
            className={emailError ? "input-error" : ""}
          />
          {emailError && <span className="error-text">{emailError}</span>}

          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Write your message here..."
            value={form.message}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={loading}
            minLength={4}
            maxLength={500}
            className={messageError ? "input-error" : ""}
          />
          {messageError && <span className="error-text">{messageError}</span>}

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}