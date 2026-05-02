import { useState } from "react";
import { useStore } from "../../StoreContext";
import ItemForm from "../../components/ItemForm";
import "./Found.css";

export default function Found() {
  const { state, addItem, searchPotentialMatches } = useStore();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Other",
    description: "",
    location: "",
    isImportantDoc: false,
    notForDonation: false,
    hiddenHints: "",
    image: "",
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 

  const saveToBackend = async (itemData) => {
    try {
       //  Get current user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user._id || user.id;  // Check karo konsa field hai
    
    if (!userId) {
      throw new Error("User not logged in");
    }
      const response = await fetch("http://localhost:5000/api/items/found?userId=${currentUser._id}", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        userId: userId,  
        ...itemData  }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || `Server error: ${response.status}`);
      }
      
      if (result.success) {
        return result.item;
      } else {
        throw new Error(result.message || "Unknown error occurred");
      }
      
    } catch (error) {
      throw error;
    }
  };
  //  Show message 
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    // Auto hide after 3 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  async function submit(e) {
    e.preventDefault();
    
    if (!form.name || !form.location) {
      showMessage("Please fill all required fields.", "error");
      return;
    }

    const formData = {
      name: form.name.trim(),
      brand: (form.brand || "").trim(),
      category: (form.category || "Other").trim(),
      description: (form.description || "").trim(),
      location: form.location.trim(),
      isImportantDoc: form.isImportantDoc || false,
      hiddenHints: (form.hiddenHints || "").trim(),
      image: (form.image || "").trim()
    };

    setLoading(true);

    try {
      const savedItem = await saveToBackend(formData);
      
      // Get potential matches for this found item
      const item = { ...formData, type: "found", id: savedItem._id };
      const m = searchPotentialMatches(item);
      
      // Remove duplicates from matches
      const uniqueMatches = m.filter((match, index, self) => 
        index === self.findIndex(m => 
          m.name === match.name && 
          m.brand === match.brand && 
          m.location === match.location
        )
      );
      
      setMatches(uniqueMatches);
      
      showMessage("✅ Found item reported successfully. Please submit item to SSD office.", "success");
      
      setForm({
        name: "",
        brand: "",
        category: "Other",
        description: "",
        location: "",
        isImportantDoc: false,
        hiddenHints: "",
        image: "",
      });
      
    } catch (error) {
      showMessage("❌ Error: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="found-background">
      <div className="found-container">
        <h2>Report Found Item</h2>

        {message && (
          <div className={`notice ${messageType === 'success' ? 'found-toast-success' : 'found-toast-error'}`}>
            {message}
          </div>
        )}

        <form className="found-form" onSubmit={submit} noValidate>
          <ItemForm form={form} setForm={setForm} mode="found" />
          
          <button 
            type="submit" 
            className="found-submit"
            disabled={loading}
          >
            {loading ? "Saving..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}