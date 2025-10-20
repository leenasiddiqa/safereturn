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
