import React, { useRef } from "react";

export default function ItemForm({ form, setForm, onSubmit, mode = "lost" }) {
  const fileInput = useRef();

  function handleFile(e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, image: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <>
      <div className="form-two-column">
        {/* Left Column */}
        <div className="left-column">
          <label>
            Name*
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
          </label>

          <label>
            Brand
            <input
              value={form.brand}
              onChange={(e) =>
                setForm((f) => ({ ...f, brand: e.target.value }))
              }
            />
          </label>

          <label>
            Category
            <select
              value={form.category}
              onChange={(e) =>
                setForm((f) => ({ ...f, category: e.target.value }))
              }
            >
              {[
                "ID Card",
                "Book",
                "Wallet",
                "Stationery",
                "Electronics",
                "Other",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <label>
            {mode === "lost" ? "Last seen location*" : "Found location*"}
            <input
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
              required
            />
          </label>

          <label className="inline">
            <input
              type="checkbox"
              checked={form.isImportantDoc || false}
              onChange={(e) =>
                setForm((f) => ({ ...f, isImportantDoc: e.target.checked }))
              }
            />{" "}
            Important document (IDs, CNIC, etc.)
          </label>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <label>
            Description
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={5}
              placeholder="Describe the item in detail..."
            />
          </label>

          {mode === "lost" && (
            <label>
              Hidden identifiers (serial, marks, etc)
              <textarea
                value={form.hiddenHints}
                onChange={(e) =>
                  setForm((f) => ({ ...f, hiddenHints: e.target.value }))
                }
                rows={3}
                placeholder="Any serial numbers, unique marks, scratches, or identifying features..."
              />
            </label>
          )}

          <label>
            Upload image {mode === "found" ? "*" : "(optional)"}
            <input
              type="file"
              accept="image/*"
              ref={fileInput}
              onChange={handleFile}
              required={mode === "found"}
            />
          </label>

          {form.image && (
            <div style={{ margin: "12px 0" }}>
              <img
                src={form.image}
                alt="preview"
                style={{ maxWidth: 180, borderRadius: 8 }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
