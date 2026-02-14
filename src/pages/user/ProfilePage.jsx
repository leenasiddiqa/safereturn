import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
  const { user: authUser, logout } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    sapid: "",
    name: "", 
    username: "",
    phone: "",
    cnic: "",
    address: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false); // ✅ Yeh add karo
  const [message, setMessage] = useState("");

  // ✅ Direct AuthContext se data lelo - Backend call nahi
  useEffect(() => {
    if (authUser) {
      console.log("✅ AuthContext User Data:", authUser);
      console.log("🔍 User ID from AuthContext:", authUser.id); 
      // ✅ Direct AuthContext se data set karo
      setUser({
        sapid: authUser.sapid || "",
        name: authUser.name || "",
        username: authUser.username || "",
        phone: authUser.phone || "",
        cnic: authUser.cnic || "",
        address: authUser.address || "",
      });
    } else {
      setMessage("❌ Please login to view your profile");
    }
  }, [authUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!authUser || !authUser.id) {
      setMessage("❌ User not logged in properly");
      return;
    }

    try {
      setLoading(true);
      console.log("💾 Saving to SIGNUP database for User ID:", authUser.id);
      console.log("📊 Data to update:", { 
        name: user.name, 
        username: user.username, 
        phone: user.phone, 
        address: user.address 
      });
      
      const response = await fetch(`http://localhost:5000/api/profile/signups/${authUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          username: user.username,
          phone: user.phone,
          address: user.address,
        }),
      });

      // ✅ Better error handling to see exact response
      const responseText = await response.text();
      console.log("📨 Raw server response:", responseText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}. Response: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log("✅ Parsed response:", data);
      
      if (data.success) {
        setIsEditing(false);
        setMessage("✅ Profile updated successfully!");
      } else {
        setMessage("❌ Update failed: " + data.message);
      }
    } catch (error) {
      console.error("❌ Save error:", error);
      setMessage("❌ Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Corrected Delete Function with setDeleteLoading
  const handleDelete = async () => {
    if (!authUser || !authUser.id) {
      setMessage("❌ User not logged in properly");
      return;
    }

    const confirmDelete = window.confirm(
      "⚠️ ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT?\n\nThis action will:\n• Permanently delete your account\n• Remove all your data\n• You'll need to sign up again\n\nThis action cannot be undone!"
    );

    if (!confirmDelete) {
      setMessage("✅ Account deletion cancelled");
      return;
    }

    try {
      setDeleteLoading(true); // ✅ Ab yeh defined hai
      console.log("🗑️ Deleting account for User ID:", authUser.id);
      
      const response = await fetch(`http://localhost:5000/api/signups/${authUser.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseText = await response.text();
      console.log("📨 Delete response:", responseText);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}. Response: ${responseText}`);
      }

      const data = JSON.parse(responseText);
      
      if (data.success) {
        setMessage("✅ Account successfully deleted!");
        
        // ✅ Logout karro aur signup page redirect karo
        setTimeout(async () => {
          await logout(); // AuthContext se logout
          alert("🗑️ Your account has been permanently deleted. You'll need to sign up again.");
          navigate("/signup"); // Signup page redirect
        }, 1500);
        
      } else {
        setMessage("❌ Delete failed: " + data.message);
      }
    } catch (error) {
      console.error("❌ Delete error:", error);
      setMessage("❌ Server error: " + error.message);
    } finally {
      setDeleteLoading(false); // ✅ Loading state reset karo
    }
  };

  if (!authUser) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>Please Login First</h2>
          <p>You need to be logged in to view your profile.</p>
          <button className="btn edit" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>

        {message && (
  <div className={`notice ${message.includes('❌') ? 'error' : 'success'}`}>
    {message}
  </div>
)}

        <div className="profile-info">
          <label>
            SAP ID
            <input
              type="text"
              value={user.sapid}
              disabled={true}
              className="read-only-field"
            />
            <small className="field-note">SAP ID cannot be changed</small>
          </label>

          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your full name"
            />
          </label>

          <label>
            Username/Email
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your username"
            />
          </label>

          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your phone number"
            />
          </label>

          <label>
            CNIC
            <input
              type="text"
              value={user.cnic}
              disabled={true}
              className="read-only-field"
            />
            <small className="field-note">CNIC cannot be changed</small>
          </label>
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn edit" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <button className="btn save" onClick={handleSave} disabled={loading}>
              {loading ? "⏳ Saving..." : "💾 Save Changes"}
            </button>
          )}
          <button 
            className="btn delete" 
            onClick={handleDelete} 
            disabled={deleteLoading}
          >
            {deleteLoading ? "⏳ Deleting..." : "🗑️ Delete Account"}
          </button>
        </div>
      </div>
    </div>
  );
}