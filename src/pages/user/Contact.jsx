import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h2>Contact & Feedback</h2>
        <p className="contact-description">
          For help, questions, or to report an issue, please use the feedback
          form below or email{" "}
          <a href="mailto:support@safereturn.edu.pk" className="contact-link">
            support@safereturn.edu.pk
          </a>
          .
        </p>

        <form className="contact-form">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Write your message here..."
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
