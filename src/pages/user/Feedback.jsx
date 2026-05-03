import React, { useState } from "react";
import { useAuth } from "../../AuthContext"; 
import "./Feedback.css";

export default function Feedback() {
  const { user } = useAuth();  
  const [feedbackForm, setFeedbackForm] = useState({
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

 const showMessage = (text, type) => {
  setMessage(text);
  setMessageType(type);
  
  setTimeout(() => {
    setMessage("");
    setMessageType("");
  }, 3000);
};

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    
    if (!feedbackForm.message.trim()) {
      showMessage("⚠️ Please enter your feedback.", "error");
      return;
    }

    setLoading(true);
    setMessage("");
    setMessageType("");

    // Get email from logged-in user
    const email = user?.username || user?.email;

    if (!email) {
      showMessage("❌ User email not found. Please login again.", "error");
      setLoading(false);
      return;
    }

    try {
      const feedbackData = {
        email: email,  //  Send email
        message: feedbackForm.message.trim(),
        rating: 5
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
        showMessage("✅ Thank you for your feedback!", "success");
        setFeedbackForm({ message: "" });
      } else {
        showMessage("❌ " + result.message, "error");
      }
      
    } catch (error) {
      console.error("❌ Feedback submit error:", error);
      showMessage("❌ Error submitting feedback", "error");
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

        <p className="feedback-user"><strong>Logged in as:</strong> {user?.username || "Loading..."}</p>

        {message && (
          <div className={`feedback-notice ${messageType === 'success' ? 'feedback-toast-success' : 'feedback-toast-error'}`}>
            {message}
          </div>
        )}

        <form className="feedback-form" onSubmit={handleFeedbackSubmit} noValidate>
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
          </button>
        </form>
      </div>
    </div>
  );
}