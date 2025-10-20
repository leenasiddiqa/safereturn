import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./Donation.css";

export default function Donation() {
  const [donations, setDonations] = useState([]);

  // Example item data — replace with your actual store or API
  const items = [
    {
      id: 1,
      name: "Wallet",
      category: "Accessory",
      foundDate: "2025-09-10",
      claimed: false,
    },
    {
      id: 2,
      name: "Laptop",
      category: "Electronics",
      foundDate: "2025-09-05",
      claimed: true,
    },
    {
      id: 3,
      name: "ID Card",
      category: "Document",
      foundDate: "2025-09-01",
      claimed: false,
    },
    {
      id: 4,
      name: "Watch",
      category: "Accessory",
      foundDate: "2025-09-12",
      claimed: false,
    },
  ];

  useEffect(() => {
    const today = new Date();
    const donatedItems = items
      .filter((item) => {
        const foundDate = new Date(item.foundDate);
        const diffDays = (today - foundDate) / (1000 * 3600 * 24);
        // Donation rule: unclaimed + older than 30 days + not a document
        return (
          !item.claimed &&
          diffDays > 30 &&
          item.category.toLowerCase() !== "document"
        );
      })
      .map((item) => ({
        ...item,
        donatedOn: new Date().toISOString().split("T")[0],
        donor: "System Auto Donation",
      }));

    setDonations(donatedItems);
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />

      <main className="admin-main">
        <h2 className="admin-title">Donations Management</h2>

        <div className="donation-container">
          {donations.length > 0 ? (
            <table className="donation-table">
              <thead>
                <tr>
                  <th>Item ID</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Found Date</th>
                  <th>Donated On</th>
                  <th>Donor</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.category}</td>
                    <td>{d.foundDate}</td>
                    <td>{d.donatedOn}</td>
                    <td>{d.donor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-donations">
              No items eligible for donation. All items are either claimed or
              under the 30-day threshold.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
