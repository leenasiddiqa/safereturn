import React, { useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Leena Siddiqa",
    email: "leena@example.com",
    phone: "0312-4567890",
    address: "Karachi, Pakistan",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle save
  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
    // later you can connect this to your backend update logic
  };

  // Handle delete
  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      // delete user logic (API call or state clear)
      alert("Your account has been deleted.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-info">
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
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
            />
          </label>

          <label>
            Address
            <textarea
              name="address"
              value={user.address}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </label>
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button className="btn edit" onClick={() => setIsEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <button className="btn save" onClick={handleSave}>
              💾 Save Changes
            </button>
          )}
          <button className="btn delete" onClick={handleDelete}>
            🗑️ Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
