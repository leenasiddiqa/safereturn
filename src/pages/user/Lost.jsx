import { useState } from "react";
import { useStore } from "../../StoreContext";
import ItemForm from "../../components/ItemForm";
import "./Lost.css"; // 👈 import CSS

export default function Lost() {
  const { state, addItem, searchPotentialMatches } = useStore();
  const [form, setForm] = useState({
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
  }

  return (
    <div className="lost-background">
      <div className="lost-container">
        <h2>Report Lost Item</h2>

        {message && <div className="notice">{message}</div>}

        <form onSubmit={submit}>
          <div className="lost-grid">
            <ItemForm
              form={form}
              setForm={setForm}
              mode="lost"
              layout="twocol"
            />
          </div>

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
