import { useState } from "react";
import { useStore } from "../../StoreContext";
import ItemForm from "../../components/ItemForm";
<<<<<<< HEAD
import "./Lost.css";
=======
import "./Lost.css"; // 👈 import CSS
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

export default function Lost() {
  const { state, addItem, searchPotentialMatches } = useStore();
  const [form, setForm] = useState({
<<<<<<< HEAD
    name: "", brand: "", category: "Other", description: "",
    location: "", hiddenHints: "", image: "",
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // ✅ Message state add ki
  const [messageType, setMessageType] = useState(""); // ✅ success ya error ke liye

  const saveToBackend = async (itemData) => {
    try {
      const response = await fetch("http://localhost:5000/api/items/lost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      const result = await response.json();
      if (result.success) return result.item;
      else throw new Error(result.message);
      
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

    // ✅ Prepare form data for comparison
    const formData = {
      name: form.name.trim(),
      brand: (form.brand || "").trim(),
      category: (form.category || "Other").trim(),
      description: (form.description || "").trim(),
      location: form.location.trim(),
      hiddenHints: (form.hiddenHints || "").trim(),
      image: (form.image || "").trim()
    };

    // ✅ STRICT DUPLICATE CHECK
    const isExactDuplicate = state.items.some(item => 
      item.type === "lost" && 
      item.name?.trim() === formData.name &&
      item.brand?.trim() === formData.brand &&
      item.category?.trim() === formData.category &&
      item.description?.trim() === formData.description &&
      item.location?.trim() === formData.location &&
      item.hiddenHints?.trim() === formData.hiddenHints
    );

    if (isExactDuplicate) {
      showMessage("❌ This exact item has already been reported.", "error");
      return;
    }

    setLoading(true);

    try {
      const savedItem = await saveToBackend(formData);
      addItem({ ...formData, type: "lost", id: savedItem._id });
      
      const item = { ...formData, type: "lost", id: savedItem._id };
      const m = searchPotentialMatches(item);
      setMatches(m);
      
      showMessage("✅ Lost item reported successfully. We will notify if a match appears.", "success");
      
      setForm({
        name: "", brand: "", category: "Other", description: "",
        location: "", hiddenHints: "", image: "",
      });
      
    } catch (error) {
      showMessage("❌ Error: " + error.message, "error");
    } finally {
      setLoading(false);
    }
=======
    name: "",
    brand: "",
    category: "Other",
    description: "",
    location: "",
    hiddenHints: "",
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
    addItem({ ...form, type: "lost" });
    const item = { ...form, type: "lost", id: state.items[0]?.id };
    const m = searchPotentialMatches(item);
    setMatches(m);
    setMessage("Lost item reported. We will notify if a match appears.");
    setForm({
      name: "",
      brand: "",
      category: "Other",
      description: "",
      location: "",
      hiddenHints: "",
      image: "",
    });
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  }

  return (
    <div className="lost-background">
      <div className="lost-container">
        <h2>Report Lost Item</h2>

<<<<<<< HEAD
        {/* ✅ Custom Notification */}
        {message && (
          <div className={`notice ${messageType === 'success' ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
=======
        {message && <div className="notice">{message}</div>}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

        <form onSubmit={submit}>
          <div className="lost-grid">
            <ItemForm
              form={form}
              setForm={setForm}
              mode="lost"
              layout="twocol"
            />
          </div>

<<<<<<< HEAD
          <button 
            type="submit" 
            className="lost-submit"
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
          <button type="submit" className="lost-submit">
            Submit
          </button>
        </form>
      </div>

      {matches.length > 0 && (
        <div className="panel">
          <h3>Potential matches from found items</h3>
          <ul>
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
