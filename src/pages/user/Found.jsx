import { useState } from "react";
import { useStore } from "../../StoreContext";
import ItemForm from "../../components/ItemForm";
<<<<<<< HEAD
import "./Found.css";
=======
import "./Found.css"; // 👈 import CSS
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

export default function Found() {
  const { state, addItem, searchPotentialMatches } = useStore();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Other",
    description: "",
    location: "",
    isImportantDoc: false,
<<<<<<< HEAD
    hiddenHints: "",
    image: "",
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // ✅ Message state add ki
  const [messageType, setMessageType] = useState(""); // ✅ success ya error ke liye

  const saveToBackend = async (itemData) => {
    try {
      const response = await fetch("http://localhost:5000/api/items/found", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
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

  // ✅ Show message function
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
      showMessage("⚠️ Please fill required fields (name, location).", "error");
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
      
      // Get potential matches (lekin show nahi karenge)
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
      
      showMessage("✅ Found item reported successfully. Potential owners will be notified if matched.", "success");
      
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
=======
    image: "",
  });
  const [message, setMessage] = useState("");
  const [matches, setMatches] = useState([]);

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.location) {
      setMessage("Please fill required fields (name, location).");
      return;
    }
    addItem({ ...form, type: "found" });
    // Find the most recent found item (just added)
    const item = { ...form, type: "found", id: state.items[0]?.id };
    const m = searchPotentialMatches(item);
    setMatches(m);
    setMessage(
      "Found item reported. Potential owners will be notified if matched."
    );
    setForm({
      name: "",
      brand: "",
      category: "Other",
      description: "",
      location: "",
      isImportantDoc: false,
      image: "",
    });
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  }

  return (
    <div className="found-background">
      <div className="found-container">
        <h2>Report Found Item</h2>

<<<<<<< HEAD
        {/* ✅ Custom Notification */}
        {message && (
          <div className={`notice ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
=======
        {message && <div className="found-notice">{message}</div>}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

        <form className="found-form" onSubmit={submit}>
          <ItemForm form={form} setForm={setForm} mode="found" />

<<<<<<< HEAD
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
=======
          <button type="submit" className="found-submit">
            Submit
          </button>
        </form>
      </div>

      {matches.length > 0 && (
        <div className="found-panel">
          <h3>Potential matches from lost reports</h3>
          <ul className="found-list">
            {matches.map((i) => (
              <li key={i.id}>
                <strong>{i.name}</strong> — {i.brand} — {i.location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
