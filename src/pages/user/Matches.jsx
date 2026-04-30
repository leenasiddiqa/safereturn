import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Matches.css";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRealMatches();
  }, []);

  // notify found owner about potential match
  const notifyFoundOwner = async (userId, itemName) => {
    try {
      await fetch("http://localhost:5000/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          type: "match",
          message: `Your found ${itemName} matches a lost report. The lost owner will contact SSD.`,
          relatedItemId: null
        }),
      });
      console.log("✅ Notification sent to found owner");
    } catch (error) {
      console.error("❌ Notification failed:", error);
    }
  };

  const fetchRealMatches = async () => {
    try {
      console.log("🔍 Starting to fetch matches...");
      
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user._id || user.id;
      
      console.log("👤 Current userId:", userId);
      
      if (!userId) {
        console.error("❌ No userId found");
        setLoading(false);
        return;
      }
      
      // Fetch all lost and found items (for matching)
      const [lostResponse, foundResponse] = await Promise.all([
        fetch(`http://localhost:5000/api/items/lost`),
        fetch(`http://localhost:5000/api/items/found`)
      ]);

      const allLostItems = await lostResponse.json();
      const allFoundItems = await foundResponse.json();

      console.log("📦 All Lost items:", allLostItems.length);
      console.log("📦 All Found items:", allFoundItems.length);

      // only match items for currect user
      const realMatches = [];
      
      for (const lostItem of allLostItems) {
        // lost items for current user
        if (lostItem.userId !== userId) continue;
        
        for (const foundItem of allFoundItems) {
          // unclaimed found items only
          if (foundItem.claimed) continue;
          
          //  MATCH CHECK: Name, Category, Location
          const isMatch = 
            lostItem.name && foundItem.name && 
            lostItem.name.toLowerCase() === foundItem.name.toLowerCase() &&
            lostItem.category === foundItem.category &&
            lostItem.location === foundItem.location;
          
          if (isMatch) {
            console.log("✅ MATCH FOUND for lost item:", lostItem.name);
            
            //  Important document match  
            if (lostItem.isImportantDoc || foundItem.isImportantDoc) {
              await fetch(`http://localhost:5000/api/items/lost/${lostItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resolved: true, status: "resolved" })
              });
              await fetch(`http://localhost:5000/api/items/found/${foundItem._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resolved: true, status: "resolved" })
              });
            }
            
            realMatches.push({
              id: `${lostItem._id}-${foundItem._id}`,
              name: foundItem.name,
              category: foundItem.category,
              brand: foundItem.brand,
              location: foundItem.location,
              foundItemId: foundItem._id,
              foundItemFullId: foundItem._id,
              lostItemId: lostItem._id
            });
            
            // notify to found owner
            notifyFoundOwner(foundItem.userId, foundItem.name);
          }
        }
      }

      console.log("🎯 Final matches for user:", realMatches.length);
      setMatches(realMatches);
      
    } catch (error) {
      console.error("Error fetching matches:", error);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  //  Claim button handler
  const handleClaimClick = (itemId) => {
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
      <h2 className="matches-title">🔍 Matches Found</h2>
      <p className="matches-description">
        Items that match your lost reports based on <strong>Item Name, Category, and Location</strong>.
      </p>

      {matches.length === 0 ? (
        <div className="no-matches">
          <h3>No matches found</h3>
          <p>When your lost items match with found items, they will appear here.</p>
        </div>
      ) : (
        <div className="matches-list">
          {matches.map((item) => (
            <div key={item.id} className="match-card">
              <div className="match-info">
                <h3>{item.name}</h3>
                <p>
                  <strong>Category:</strong> {item.category}
                </p>
                <p>
                  <strong>Brand:</strong> {item.brand}
                </p>
                <p>
                  <strong>Location:</strong> {item.location}
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