// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useStore } from "../../StoreContext";
import { useEffect, useMemo } from "react";

export default function Home() {
  const { state, autoProcessAging } = useStore();

  useEffect(() => {
    autoProcessAging();
  }, []);

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

      <div
        style={{
          marginTop: "60px",
          padding: "40px 20px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          textAlign: "center",
          fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
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
          Everything You Need
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
          All the tools to recover lost items, donate, and stay safe.
        </p>

        {/* GRID: exactly 3 cards per row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "30px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#f9f9fc",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>📱</div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Mobile Alerts
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#5a6e8a",
                lineHeight: "1.5",
              }}
            >
              Get instant notifications when your lost item is matched.
            </p>
          </div>

          {/* Card 2 */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#f9f9fc",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🗺️</div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Location Tracking
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#5a6e8a",
                lineHeight: "1.5",
              }}
            >
              See where your item was last reported or found.
            </p>
          </div>

          {/* Card 3 */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#f9f9fc",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>📄</div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Digital Receipts
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#5a6e8a",
                lineHeight: "1.5",
              }}
            >
              Get a verified digital receipt for every claim or donation.
            </p>
          </div>

          {/* Card 4 (second row, first column) */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#f9f9fc",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🔔</div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Real-Time Updates
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#5a6e8a",
                lineHeight: "1.5",
              }}
            >
              Track the status of your report from lost to found.
            </p>
          </div>

          {/* Card 5 */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#f9f9fc",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>🔐</div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Privacy First
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#5a6e8a",
                lineHeight: "1.5",
              }}
            >
              Your data is encrypted and never shared without permission.
            </p>
          </div>

          {/* Card 6 */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "#f9f9fc",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "transform 0.2s",
              textAlign: "center",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-5px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>📞</div>
            <h3
              style={{
                fontSize: "1.3rem",
                fontWeight: "700",
                color: "#11315b",
                marginBottom: "10px",
              }}
            >
              Direct Helpdesk
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#5a6e8a",
                lineHeight: "1.5",
              }}
            >
              Call or chat with our support team anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Optional: display aging logs */}
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
