import { useState } from "react";
import { useStore } from "../../StoreContext";
import ItemForm from "../../components/ItemForm";
import "./Lost.css";

export default function Lost() {
  const { state, addItem, searchPotentialMatches } = useStore();
  const [form, setForm] = useState({
    name: "", brand: "", category: "Other", description: "",
    location: "", hiddenHints: "", image: "",
    isImportantDoc: false,
  });
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 

  const saveToBackend = async (itemData) => {
    try {
      //  Get current user from localStorage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userId = user._id || user.id;
    
    console.log("📤 Sending userId:", userId);  
    
    if (!userId) {
      throw new Error("User not logged in");
    }
      const response = await fetch("http://localhost:5000/api/items/lost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body: JSON.stringify({
        userId: userId,  
        ...itemData
      }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      
      const result = await response.json();
      if (result.success) return result.item;
      else throw new Error(result.message);
      
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
      showMessage(" Please fill required fields.", "error");
      return;
    }

    //  Prepare form data for comparison
    const formData = {
      name: form.name.trim(),
      brand: (form.brand || "").trim(),
      category: (form.category || "Other").trim(),
      description: (form.description || "").trim(),
      location: form.location.trim(),
      hiddenHints: (form.hiddenHints || "").trim(),
      image: (form.image || "").trim(),
      isImportantDoc: form.isImportantDoc || false,
    };

    // DUPLICATE CHECK
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
  }

  return (
    <div className="lost-background">
      <div className="lost-container">
        <h2>Report Lost Item</h2>

       
        {message && (
          <div className={`notice ${messageType === 'success' ? 'lost-toast-success' : 'lost-toast-error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={submit} noValidate>
          <div className="lost-grid">
            <ItemForm
              form={form}
              setForm={setForm}
              mode="lost"
              layout="twocol"
            />
          </div>

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