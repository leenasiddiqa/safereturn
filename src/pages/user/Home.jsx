// ...existing code...
import { Link } from "react-router-dom";
import { useStore } from "../../StoreContext";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { state, autoProcessAging } = useStore();
  useEffect(() => {
    autoProcessAging();
    // Only run once on mount
    // eslint-disable-next-line
  }, []);
  // Find aging updates in logs
  const updates = useMemo(
    () => state.logs.filter((l) => l.type.startsWith("aging:")).slice(0, 10),
    [state.logs]
  );
  return (
    <section>
      <h1>Welcome to SafeReturn</h1>
      <p>
        A simple portal to report lost and found items, submit claims, and
        ensure items are returned or responsibly donated.
      </p>
      {updates.length > 0 && (
        <div className="notice">
          Processed {updates.length} aging items:
          <ul>
            {updates.map((u, idx) => (
              <li key={idx}>
                {u.type.replace("aging:", "").toUpperCase()} for item {u.itemId}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="cards">
        <Link to="/lost" className="card">
          Report Lost Item
        </Link>
        <Link to="/found" className="card">
          Report Found Item
        </Link>
        <Link to="/claim" className="card">
          Claim & Verification
        </Link>
        <Link to="/donation" className="card">
          Donation & Documents
        </Link>
        <Link to="/admin" className="card">
          Admin Dashboard
        </Link>
      </div>
    </section>
  );
}
