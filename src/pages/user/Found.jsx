import { useState } from "react";
import { useStore } from "../../StoreContext";
import ItemForm from "../../components/ItemForm";
import "./Found.css"; // 👈 import CSS

export default function Found() {
  const { state, addItem, searchPotentialMatches } = useStore();
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "Other",
    description: "",
    location: "",
    isImportantDoc: false,
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
  }

  return (
    <div className="found-background">
      <div className="found-container">
        <h2>Report Found Item</h2>

        {message && <div className="found-notice">{message}</div>}

        <form className="found-form" onSubmit={submit}>
          <ItemForm form={form} setForm={setForm} mode="found" />

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
