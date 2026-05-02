import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./AdminContacts.css";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact");
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
const handleReply = async (id) => {
  const replyMsg = replyText[id];
  
  // ✅ Minimum 4 characters validation
  if (!replyMsg || replyMsg.trim().length < 4) {
    setMessage("❌ Reply must be at least 4 characters.");
    setMessageType("error");
    setTimeout(() => setMessage(""), 2000);
    return;
  }
  
  try {
    const res = await fetch(`http://localhost:5000/api/contact/${id}/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: replyMsg.trim() })
    });
    
    if (res.ok) {
      setMessage("✅ Reply sent successfully!");
      setMessageType("success");
      fetchContacts();
      setReplyText({ ...replyText, [id]: "" });
    } else {
      setMessage("❌ Failed to send reply");
      setMessageType("error");
    }
    
    setTimeout(() => setMessage(""), 3000);
    
  } catch (error) {
    console.error("Error:", error);
    setMessage("❌ Error sending reply");
    setMessageType("error");
  }
};
  const handleDelete = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      setMessage("🗑️ Message deleted successfully!");
      setMessageType("success");
      fetchContacts();
    } else {
      setMessage("❌ Failed to delete message");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);

  } catch (error) {
    console.error("Error:", error);
    setMessage("❌ Error deleting message");
    setMessageType("error");

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  }
};

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />
        <main className="admin-main">
          <h2>Loading...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main">
        <div className="admin-header">
          <h2 className="admin-title">Contact Queries</h2>
          <span className="panel-badge">{contacts.length} messages</span>
        </div>

        {message && (
  <div className={`notice ${messageType}`}>
    {message}
  </div>
)}

        {contacts.length === 0 ? (
          <div className="admin-panel">
            <p>No contact messages yet.</p>
          </div>
        ) : (
          <div className="contacts-grid">
            {contacts.map((contact) => (
              <div key={contact._id} className="contact-card">
                <div className="contact-header">
                  <div>
                    <strong>{contact.name}</strong>
                    <span className="contact-email">{contact.email}</span>
                  </div>
                  <span className={`status-badge ${contact.status}`}>
                    {contact.status}
                  </span>
                </div>
                
                <div className="contact-message">
                  <strong>Message:</strong>
                  <p>{contact.message}</p>
                </div>
                
                {contact.reply && (
                  <div className="contact-reply">
                    <strong>Your Reply:</strong>
                    <p>{contact.reply}</p>
                  </div>
                )}
                
                <div className="contact-reply-box">
  {!contact.reply ? (
    <>
      <textarea
        placeholder="Write your reply here..."
        value={replyText[contact._id] || ""}
        onChange={(e) => setReplyText({ ...replyText, [contact._id]: e.target.value })}
        rows="2"
      />
      <div className="contact-actions">
        <button onClick={() => handleReply(contact._id)} className="reply-btn">
           Send
        </button>
        <button onClick={() => handleDelete(contact._id)} className="delete-btn">
           Delete
        </button>
      </div>
    </>
  ) : (
    <div className="reply-sent">
     
      <button onClick={() => handleDelete(contact._id)} className="delete-btn">
         Delete
      </button>
    </div>
  )}
</div>
                
                <div className="contact-date">
                  Received: {new Date(contact.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}