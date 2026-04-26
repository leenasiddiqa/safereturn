import { Link } from "react-router-dom";
import { useStore } from "../../StoreContext";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { state, autoProcessAging } = useStore();
  useEffect(() => {
    autoProcessAging();
  }, []);
  // Find aging updates in logs
  const updates = useMemo(
    () => state.logs.filter((l) => l.type.startsWith("aging:")).slice(0, 10),
    [state.logs]
  );
  return (
    <section>
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
