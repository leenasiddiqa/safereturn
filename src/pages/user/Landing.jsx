import { Link } from "react-router-dom";
<<<<<<< HEAD
import image from "../../assets/image.jpg"; // ✅ Make sure this path is correct
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

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
<<<<<<< HEAD
            padding: "0 5vw",
=======
            padding: "0 5vw 0 5vw",
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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
<<<<<<< HEAD

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

=======
        {/* Right: Illustration/Icon */}
        <div
          style={{
            flex: "0 0 50vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            background: "transparent",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: 320,
              height: 320,
              boxShadow: "0 8px 32px rgba(17,49,91,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="160"
              height="160"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="24"
                cy="24"
                r="22"
                stroke="#E68A62"
                strokeWidth="4"
                fill="#fff"
              />
              <path
                d="M24 34c-6-4-10-7.5-10-12.5C14 15 18 13 24 13s10 2 10 8.5C34 26.5 30 30 24 34Z"
                fill="#E68A62"
              />
              <circle cx="24" cy="21" r="3.5" fill="#11315B" />
            </svg>
          </div>
        </div>
      </main>
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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
<<<<<<< HEAD
            img {
              width: 60%;
            }
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          }
        `}
      </style>
    </div>
  );
}
