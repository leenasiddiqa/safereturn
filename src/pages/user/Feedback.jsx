<<<<<<< HEAD
import React, { useState } from "react";
import "./Feedback.css";

export default function Feedback() {
  const [feedbackForm, setFeedbackForm] = useState({
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // ✅ Message type ke liye

  // ✅ Show message function
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    // Auto hide after 3 seconds for success
    if (type === 'success') {
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 3000);
    }
  };

  // ✅ Feedback submit karna
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedbackForm.message.trim()) {
      showMessage("⚠️ Please enter your feedback.", "error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const feedbackData = {
        type: "feedback",
        message: feedbackForm.message.trim()
      };

      console.log("📤 Sending feedback data:", feedbackData);

      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackData),
      });

      const result = await response.json();

      if (result.success) {
        showMessage("✅ " + result.message, "success");
        setFeedbackForm({ message: "" }); // Form reset
      } else {
        showMessage("❌ " + result.message, "error");
      }
      
    } catch (error) {
      console.error("❌ Feedback submit error:", error);
      showMessage("❌ Error submitting feedback: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h2>Feedback</h2>
        <p className="feedback-description">
          We value your feedback! Share your thoughts, suggestions, or any issues 
          you're facing with the SafeReturn platform.
        </p>

        {/* ✅ Custom Notification */}
        {message && (
          <div className={`notice ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form className="feedback-form" onSubmit={handleFeedbackSubmit}>
          <label htmlFor="feedback">Your Feedback *</label>
          <textarea
            id="feedback"
            name="feedback"
            rows={6}
            placeholder="Share your thoughts or suggestions here..."
            value={feedbackForm.message}
            onChange={(e) => setFeedbackForm({ message: e.target.value })}
            required
            disabled={loading}
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Feedback"}
=======
import React from "react";
import "./Feedback.css";

export default function Feedback() {
  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h2>Feedback & Issue Reporting</h2>

        <form className="feedback-form">
          <label htmlFor="feedback">Feedback</label>
          <textarea
            id="feedback"
            name="feedback"
            rows={4}
            placeholder="Share your thoughts or suggestions..."
            required
          ></textarea>

          <button type="submit">Submit Feedback</button>
        </form>

        <hr className="feedback-divider" />

        <form className="feedback-form">
          <label htmlFor="issue">Report an Issue</label>
          <textarea
            id="issue"
            name="issue"
            rows={4}
            placeholder="Describe the issue you're facing..."
            required
          ></textarea>

          <button type="submit" className="report-btn">
            Report Issue
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          </button>
        </form>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
