import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import "./Contact.css";

export default function Contact() {
  const { user } = useAuth();  //  Get logged-in user
  const [form, setForm] = useState({
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [touched, setTouched] = useState({ email: false, message: false });

  //  Auto-fetch email from logged-in user
  useEffect(() => {
    if (user) {
      const userEmail = user.username || user.email;
      setForm(prev => ({ ...prev, email: userEmail || "" }));
    }
  }, [user]);

  //  Email validation - only Riphah domains
  const validateEmail = (email) => {
    const riphahEmailRegex = /^[^\s@]+@(students\.riphah\.edu\.pk|riphah\.edu\.pk)$/;
    return riphahEmailRegex.test(email);
  };

  const showMessage = (text, type) => {
  setMessage(text);
  setMessageType(type);

  setTimeout(() => {
    setMessage("");
    setMessageType("");
  }, 2000); 
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'message') {
      const truncatedValue = value.slice(0, 500);
      setForm({ ...form, [name]: truncatedValue });
    }
  };

  const handleBlur = (e) => {
  const { name, value } = e.target;
  setTouched({ ...touched, [name]: true });

  if (name === "message" && value.length < 4) {
    showMessage("❌ Message must be at least 4 characters long.", "error");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.email || !form.message) {
      showMessage("Please enter your issue.", "error");
      return;
    }

    if (!validateEmail(form.email)) {
      showMessage("❌ Please use your Riphah email (@students.riphah.edu.pk or @riphah.edu.pk)", "error");
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
        setForm({ ...form, message: "" });  //  Only clear message, email stays
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

  const emailError = messageType === 'error' && !validateEmail(form.email) && touched.email
    ? "Please use your Riphah email (@students.riphah.edu.pk or @riphah.edu.pk)" 
    : "";

  const messageError = messageType === 'error' && form.message.length < 4 && touched.message
    ? "Message must be at least 4 characters" 
    : "";

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-description">
          For help, questions, or to report an issue, please use the form below.
        </p>

        {message && (
          <div className={`notice ${messageType === 'success' ? 'contact-toast-success' : 'contact-toast-error'}`}>
            {message}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Your Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email will auto-fill"
            value={form.email}
            readOnly  
            disabled
            className="readonly-input"
          />

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
            maxLength={500}
            className={messageError ? "input-error" : ""}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}