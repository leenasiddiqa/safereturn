<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Matches.css";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRealMatches();
  }, []);

  // ✅ Notification create karne ka function
  const createMatchNotification = async (lostItem, foundItem) => {
    try {
      const message = `A possible match found for your lost ${lostItem.name}. Check the matches section for details.`;
      
      console.log("📨 Creating notification for item:", foundItem._id);
      
      const response = await fetch("http://localhost:5000/api/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: foundItem._id,
          type: "match",
          message: message,
          relatedItemId: foundItem._id
        }),
      });

      if (response.ok) {
        console.log("✅ Notification created with item ID:", foundItem._id);
      } else {
        console.log("❌ Failed to create notification");
      }
      
    } catch (error) {
      console.error("❌ Error creating match notification:", error);
    }
  };

  const fetchRealMatches = async () => {
    try {
      console.log("🔍 Starting to fetch matches...");
      
      const [lostResponse, foundResponse] = await Promise.all([
        fetch("http://localhost:5000/api/items/lost"),
        fetch("http://localhost:5000/api/items/found")
      ]);

      const lostItems = await lostResponse.json();
      const foundItems = await foundResponse.json();

      console.log("📦 Lost items:", lostItems);
      console.log("📦 Found items:", foundItems);

      // ✅ ONLY 3 FIELDS MATCHING: Name, Category, Location
      const realMatches = [];
      const usedFoundItems = new Set();
      
      lostItems.forEach(lostItem => {
        foundItems.forEach(foundItem => {
          if (usedFoundItems.has(foundItem._id) || foundItem.claimed) {
            return;
          }

          // ✅ ONLY THESE 3 FIELDS MATCH CHECK
          const isMatch = 
            lostItem.name && foundItem.name && 
            lostItem.name.toLowerCase() === foundItem.name.toLowerCase() &&
            lostItem.category === foundItem.category &&
            lostItem.location === foundItem.location;

          if (isMatch) {
            console.log("✅ MATCH FOUND!");
            console.log("📝 Matching Details:", {
              name: `${lostItem.name} === ${foundItem.name}`,
              category: `${lostItem.category} === ${foundItem.category}`,
              location: `${lostItem.location} === ${foundItem.location}`
            });
            
            realMatches.push({
              id: `${lostItem._id}-${foundItem._id}`,
              name: foundItem.name,
              category: foundItem.category,
              brand: foundItem.brand,
              location: foundItem.location,
              similarity: "100% Exact Match",
              foundItemId: foundItem._id,
              foundItemFullId: foundItem._id,
              lostItemId: lostItem._id
            });
            
            usedFoundItems.add(foundItem._id);

            // ✅ NOTIFICATION CREATE KAREN
            console.log("🎯 CREATING NOTIFICATION FOR ITEM:", foundItem._id);
            createMatchNotification(lostItem, foundItem);
          }
        });
      });

      console.log("🎯 Final matches:", realMatches);
      setMatches(realMatches);
      
    } catch (error) {
      console.error("Error fetching matches:", error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Claim button handler
  const handleClaimClick = (itemId) => {
    // Claim page par navigate karen aur item ID pass karen
    navigate(`/claim?itemId=${itemId}`);
  };

  if (loading) {
    return (
      <section className="matches-container">
        <h2 className="matches-title">🔍 Finding Matches...</h2>
        <p>Please wait while we search for matching items.</p>
      </section>
    );
  }

  return (
    <section className="matches-container">
      <h2 className="matches-title">🔍 Exact Matches Found</h2>
      <p className="matches-description">
        Items that match based on <strong>Item Name, Category, and Location</strong>.
      </p>

      {matches.length === 0 ? (
        <div className="no-matches">
          <h3>No matches found</h3>
          <p>When lost and found items have matching <strong>Name, Category, and Location</strong>, they will appear here.</p>
        </div>
      ) : (
        <div className="matches-list">
          {matches.map((item) => (
            <div key={item.id} className="match-card">
              <div className="match-info">
                <h3>{item.name}</h3>
                <p>
                  <strong>Item ID:</strong> <span className="item-id">{item.foundItemFullId}</span>
                </p>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Brand:</strong> {item.brand}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
                </p>
                <p className="similarity exact-match">
                  <strong>Match Confidence:</strong> {item.similarity}
                </p>
              </div>
              <div className="match-actions">
                <button 
                  onClick={() => handleClaimClick(item.foundItemFullId)}
                  className="claim-btn"
                >
                  Claim Item
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
=======
// ...existing code...
import React from "react";
import { Link } from "react-router-dom";
import "./Matches.css";

export default function Matches() {
  const matches = [
    {
      id: "L001",
      name: "Black Leather Wallet",
      category: "Accessories",
      brand: "Levis",
      location: "Library",
      similarity: "95%",
    },
    {
      id: "L002",
      name: "Samsung Galaxy S21",
      category: "Electronics",
      brand: "Samsung",
      location: "Cafeteria",
      similarity: "89%",
    },
    {
      id: "L003",
      name: "Blue Backpack",
      category: "Bags",
      brand: "Nike",
      location: "Classroom 204",
      similarity: "92%",
    },
  ];

  return (
    <section className="matches-container">
      <h2 className="matches-title">🔍 Possible Matches</h2>
      <p className="matches-description">
        These are the items that the system identified as potential matches
        between <strong>Lost</strong> and <strong>Found</strong> items.
      </p>

      <div className="matches-list">
        {matches.map((item) => (
          <div key={item.id} className="match-card">
            <div className="match-info">
              <h3>{item.name}</h3>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Brand:</strong> {item.brand}
              </p>
              <p>
                <strong>Found at:</strong> {item.location}
              </p>
              <p className="similarity">
                <strong>Similarity:</strong> {item.similarity}
              </p>
            </div>
            <div className="match-actions">
              <Link to="/claim" className="claim-btn">
                Claim Item
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
