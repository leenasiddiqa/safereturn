import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminFeedback.css";

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/feedback");
      const data = await res.json();
      setFeedbacks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    
    try {
      const res = await fetch(`http://localhost:5000/api/feedback/${id}`, { 
        method: "DELETE" 
      });
      
      if (res.ok) {
        setFeedbacks(prev => prev.filter(fb => fb._id !== id));
        setMessage("✅ Feedback deleted!");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("❌ Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("❌ Error deleting");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return "";
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />
        <main className="admin-main">
          <h2>Loading feedbacks...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h2 className="admin-title">User Feedback</h2>
          <span className="panel-badge">{feedbacks.length} entries</span>
        </div>

        {message && <div className="feedback-notice success">{message}</div>}

        {feedbacks.length === 0 ? (
          <div className="admin-panel">
            <p>No feedbacks yet.</p>
          </div>
        ) : (
          <div className="feedback-grid">
            {feedbacks.map((fb) => (
              <div key={fb._id} className="feedback-card">
                <div className="feedback-field">
                  <span className="field-label">Email:</span>
                  <span className="field-value">{fb.email || "Anonymous"}</span>
                </div>
                <div className="feedback-field">
                  <span className="field-label">Message:</span>
                  <span className="field-value">{fb.message}</span>
                </div>
                <div className="feedback-field">
                  <span className="field-label">Date:</span>
                  <span className="field-value">{formatDate(fb.createdAt || fb.submissionDate)}</span>
                </div>
                <div className="feedback-footer">
                  <button 
                    className="delete-feedback-btn"
                    onClick={() => handleDelete(fb._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}