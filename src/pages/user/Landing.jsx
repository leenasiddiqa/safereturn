import { Link } from "react-router-dom";
import image from "../../assets/image.jpg"; // ✅ Make sure this path is correct

export default function Landing() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #11315B 60%, #E68A62 100%)",
        display: "flex",
        flexDirection: "column",
        overflowX: "hidden",
      }}
    >
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "stretch",
          justifyContent: "center",
          padding: 0,
          margin: 0,
          width: "100vw",
          boxSizing: "border-box",
          minHeight: "100vh",
        }}
      >
        {/* Left: Text */}
        <div
          style={{
            flex: "0 0 50vw",
            background: "#11315B",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "0 5vw",
            boxSizing: "border-box",
          }}
        >
          <h1
            style={{
              fontSize: 56,
              color: "#fff",
              marginBottom: 16,
              fontWeight: 800,
              lineHeight: 1.1,
            }}
          >
            Lost & Found, <span style={{ color: "#E68A62" }}>Simplified</span>
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "#f0f4fa",
              marginBottom: 32,
              fontWeight: 400,
              maxWidth: 520,
            }}
          >
            A secure, transparent portal for reporting, claiming, and managing
            lost and found items at your university. Empowering students, staff,
            and admins for a safer, more responsible campus.
          </p>
          <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
            <Link
              to="/signup"
              style={{
                background: "#E68A62",
                color: "#fff",
                padding: "14px 36px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 18,
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(230,138,98,0.25)",
              }}
            >
              Get Started
            </Link>
            <Link
              to="/login"
              style={{
                background: "transparent",
                color: "#E68A62",
                border: "2px solid #E68A62",
                padding: "14px 36px",
                borderRadius: 8,
                fontWeight: 700,
                fontSize: 18,
                textDecoration: "none",
              }}
            >
              Login
            </Link>
          </div>
          <ul
            style={{
              color: "#fff",
              fontSize: 16,
              lineHeight: 2,
              marginLeft: 20,
            }}
          >
            <li>Report lost or found items in seconds</li>
            <li>Claim verification with admin oversight</li>
            <li>Donation & secure document return</li>
            <li>Instant notifications & full transparency</li>
          </ul>
        </div>

       {/* Right: Original Image */}
<div
  style={{
    flex: "0 0 50vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "transparent",
    padding: 20,
  }}
>
  <img
    src={image}
    alt="Lost & Found Illustration"
    style={{
      width: "100%", // smaller than full width
      maxWidth: 500, // limits the size
      height: "auto", // keeps original aspect ratio
      borderRadius: 20,
      boxShadow: "0 8px 32px rgba(17,49,91,0.2)",
      
    }}
  />
</div>

      </main>

      {/* Responsive Styles */}
      <style>
        {`
          @media (max-width: 900px) {
            main {
              flex-direction: column;
              text-align: center;
              padding: 120px 40px;
            }
            main > div {
              padding: 0;
            }
            ul {
              text-align: left;
              margin: 0 auto;
              max-width: 400px;
            }
            img {
              width: 60%;
            }
          }
        `}
      </style>
    </div>
  );
}
