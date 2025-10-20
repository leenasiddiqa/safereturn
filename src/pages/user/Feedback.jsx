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
          </button>
        </form>
      </div>
    </div>
  );
}
