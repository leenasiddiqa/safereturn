import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import "./Donation.css";

export default function Donation() {
  const [donationItems, setDonationItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAndProcessDonations();
  }, []);

  const fetchAndProcessDonations = async () => {
    try {
      console.log("🔍 Fetching donations data...");
      
      // fetch existing donations
      const donationsResponse = await fetch("http://localhost:5000/api/donations");
      const donations = await donationsResponse.json();
      
      console.log("📦 Existing donations:", donations);
      
      // if no donations, then create donations
      if (donations.length === 0) {
        console.log("🔍 No donations found, checking eligible items...");
        
        const foundResponse = await fetch("http://localhost:5000/api/items/found");
        const foundItems = await foundResponse.json();
        const now = new Date();

        const donationsToCreate = [];

        for (const item of foundItems) {
          const foundDate = new Date(item.dateReported);
          const diffDays = (now - foundDate) / (1000 * 60 * 60 * 24); 

          //  30 DAYS CONDITION 
          if (!item.claimed && diffDays > 30 && item.category?.toLowerCase() !== "document") {
            donationsToCreate.push({
              itemId: item._id,
              itemName: item.name,
              category: item.category,
              foundDate: item.dateReported,
              userId: "admin-user", 
            });
            console.log(`✅ Item eligible for donation: ${item.name} (${diffDays.toFixed(2)} days old)`);
          }
        }

        console.log("🎯 Eligible donations to create:", donationsToCreate);

        //  Create donations
        for (const donationData of donationsToCreate) {
          try {
            const response = await fetch("http://localhost:5000/api/donations", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(donationData),
            });
            
            const result = await response.json();
            console.log("✅ Donation created:", result);
          } catch (error) {
            console.error("❌ Error creating donation:", error);
          }
        }

        // Fetch updated donations after creation
        const updatedDonationsResponse = await fetch("http://localhost:5000/api/donations");
        const updatedDonations = await updatedDonationsResponse.json();
        setDonationItems(updatedDonations);
      } else {
        // If donations already exist, just set them
        setDonationItems(donations);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("❌ Error processing donations:", error);
      setLoading(false);
    }
  };

  //  Format date 
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      return 'Invalid Date';
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminSidebar />
        <main className="admin-main">
          <h2 className="admin-title">Loading Donations...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <main className="admin-main">
        <h2 className="admin-title">Donations Management</h2>
        
       
        <div style={{background: '#f0f0f0', padding: '10px', marginBottom: '15px', borderRadius: '5px'}}>
           Total Donations: {donationItems.length}
        </div>

        <div className="donation-container">
          {donationItems.length === 0 ? (
            <div className="no-data">
              <p>No donations available</p>
              <p style={{fontSize: '14px', color: '#666'}}>
                Found items that are unclaimed for more than 30 days will appear here automatically.
              </p>
            </div>
          ) : (
            <table className="donation-table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Found Date</th>
                  <th>Donated On</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donationItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.category}</td>
                    <td>{formatDate(item.foundDate)}</td>
                    <td>{formatDate(item.donatedOn)}</td>
                    <td>
                      <span className={`status ${item.status}`}>
                        {item.status === "donated" ? "Item submitted to SSD for donation" : "Eligible"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}