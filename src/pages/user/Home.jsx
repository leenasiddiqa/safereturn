// src/pages/Home.jsx (adjust path as needed)
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
    [state.logs],
  );

  return (
    <section>
      {/* Existing Cards Section */}
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

      <div
        style={{
          marginTop: "60px",
          padding: "40px 20px",
          backgroundColor: "#f9f9fc",
          borderRadius: "20px",
          textAlign: "center",
          fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#11315b",
            marginBottom: "20px",
            letterSpacing: "-0.5px",
          }}
        >
          Why Choose Us
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            color: "#2c3e50",
            maxWidth: "700px",
            margin: "0 auto 40px auto",
            lineHeight: "1.6",
          }}
        >
          We make lost & found simple, secure, and effective.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              flex: "1 1 250px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>⚡</div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Fast Matching
            </h3>
            <p
              style={{ fontSize: "1rem", color: "#5a6e8a", lineHeight: "1.5" }}
            >
              AI-powered matching system helps you find lost items instantly.
            </p>
          </div>
          <div
            style={{
              flex: "1 1 250px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🔒</div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Secure Verification
            </h3>
            <p
              style={{ fontSize: "1rem", color: "#5a6e8a", lineHeight: "1.5" }}
            >
              Identity checks and secure handover process protect your items.
            </p>
          </div>
          <div
            style={{
              flex: "1 1 250px",
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "3rem", marginBottom: "10px" }}>🤝</div>
            <h3
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              24/7 Support
            </h3>
            <p
              style={{ fontSize: "1rem", color: "#5a6e8a", lineHeight: "1.5" }}
            >
              Our team is always here to help with any questions or issues.
            </p>
          </div>
        </div>
      </div>

      {/* Optional: display aging logs (your existing code might show these) */}
      {updates.length > 0 && (
        <div
          style={{
            marginTop: "40px",
            padding: "20px",
            background: "#ecf0f1",
            borderRadius: "12px",
          }}
        >
          <h4
            style={{ fontSize: "1.2rem", fontWeight: "600", color: "#2c3e50" }}
          >
            Recent Updates
          </h4>
          <ul>
            {updates.map((log, idx) => (
              <li key={idx} style={{ fontSize: "0.9rem", color: "#7f8c8d" }}>
                {log.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
