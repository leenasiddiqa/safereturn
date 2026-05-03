import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

// ─── Scroll Reveal ───
function Reveal({ children, style, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Feature Card ───
function FeatureCard({ icon, title, desc, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "#1a3f6e" : "rgba(255,255,255,0.04)",
          border: `1px solid ${hovered ? "#E68A62" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 16,
          padding: "28px 22px",
          transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
          cursor: "default",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 12px 40px rgba(230,138,98,0.15)" : "none",
          height: "100%",
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: "linear-gradient(135deg, #E68A62, #c96d44)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 16,
          transition: "transform 0.35s",
          transform: hovered ? "scale(1.1) rotate(-4deg)" : "scale(1)",
        }}>{icon}</div>
        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
        <p style={{ color: "#b0c4de", fontSize: 13, lineHeight: 1.65, margin: 0 }}>{desc}</p>
      </div>
    </Reveal>
  );
}

// ─── Step Card ───
function StepCard({ num, title, desc, delay = 0 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "flex-start", gap: 16,
          padding: "20px 18px", borderRadius: 12,
          background: hovered ? "rgba(230,138,98,0.08)" : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? "rgba(230,138,98,0.3)" : "rgba(255,255,255,0.06)"}`,
          transition: "all 0.35s ease",
          transform: hovered ? "translateX(6px)" : "translateX(0)",
        }}
      >
        <div style={{
          minWidth: 42, height: 42, borderRadius: "50%",
          background: hovered ? "#E68A62" : "rgba(230,138,98,0.15)",
          color: hovered ? "#11315B" : "#E68A62",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, fontWeight: 800, transition: "all 0.35s ease",
          flexShrink: 0,
        }}>{num}</div>
        <div>
          <h4 style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 4, marginTop: 0 }}>{title}</h4>
          <p style={{ color: "#94a8c4", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

// ─── Action Card ───
function ActionCard({ icon, title, desc, to, color }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(to);
    }
  };

  return (
    <Reveal>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleClick}
        style={{
          background: hovered ? `${color}15` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? color : "rgba(255,255,255,0.08)"}`,
          borderRadius: 14,
          padding: "28px 24px",
          transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
          cursor: "pointer",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? `0 12px 40px ${color}22` : "none",
        }}
      >
        <div style={{
          width: 48, height: 48, borderRadius: 12,
          background: `linear-gradient(135deg, ${color}, ${color}bb)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 16,
          transition: "transform 0.35s",
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>{icon}</div>
        <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
        <p style={{ color: "#b0c4de", fontSize: 13, lineHeight: 1.65, margin: "0 0 18px 0" }}>{desc}</p>
        <span style={{
          color: color,
          fontSize: 13,
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: hovered ? 10 : 6,
          transition: "gap 0.3s",
        }}>
          {user ? "Go to page" : "Login to continue"} <span style={{ fontSize: 14 }}>→</span>
        </span>
      </div>
    </Reveal>
  );
}

// ─── Main Landing Page ───
export default function Landing() {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionPad = { padding: "60px 5vw" };
  const navigate = useNavigate();

  return (  
  
    <div style={{ width: "100%" }}>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; width: 100%; overflow-x: hidden; }
        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: #0e2647;
          overflow-x: hidden;
          width: 100%;
          min-height: 100vh;
          margin: 0; padding: 0;
        }
        ::selection { background: rgba(230,138,98,0.3); color: #fff; }
        #root, .App { width: 100%; overflow-x: hidden; }

        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

       

        /* Action grid */
        .lf-action-grid { display: grid; grid-template-columns: repeat(3, minmax(220px, 280px)); gap: 20px;  }
        .lf-how-inner { display: flex; gap: 4vw; align-items: flex-start; }
        .lf-how-left { flex: 1 1 38%; min-width: 240px; position: sticky; top: 90px; }
        .lf-how-right { flex: 1 1 55%; display: flex; flex-direction: column; gap: 12px; }
        .lf-feat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap: 18px; }

        /* Hero btns */
        .lf-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
        .hero-btn-p { padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; background: linear-gradient(135deg,#E68A62,#c96d44); color: #fff; border: none; cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 20px rgba(230,138,98,0.35); text-decoration: none; display: inline-block; }
        .hero-btn-p:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(230,138,98,0.5); }
        .hero-btn-s { padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; background: transparent; color: #fff; border: 1px solid rgba(255,255,255,0.25); cursor: pointer; transition: all 0.3s; text-decoration: none; display: inline-block; }
        .hero-btn-s:hover { border-color: #E68A62; color: #E68A62; }

        /* Footer */
        .lf-footer-top { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px; margin-bottom: 36px; }
        .footer-link { color: #5a7a9a; font-size: 14px; text-decoration: none; display: block; margin-bottom: 10px; transition: color 0.25s; cursor: pointer; }
        .footer-link:hover { color: #E68A62; }
        .footer-span { color: #5a7a9a; font-size: 14px; display: block; margin-bottom: 10px; cursor: pointer; transition: color 0.25s; }
        .footer-span:hover { color: #E68A62; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .lf-nav-links { display: none !important; }
          .lf-hamburger { display: flex !important; }
          .hero-img-wrap { display: none !important; }
          .hero-inner { flex-direction: column !important; text-align: center !important; }
          .hero-inner > div:first-child { text-align: center; }
          .hero-inner p { margin-left: auto; margin-right: auto; }
          .lf-hero-btns { justify-content: center; }
          .lf-how-inner { flex-direction: column !important; }
          .lf-how-left { position: static !important; }
          .lf-action-grid { grid-template-columns: 1fr !important; }
          .lf-footer-top { flex-direction: column; }
        }
        @media (max-width: 600px) {
          .lf-feat-grid { grid-template-columns: 1fr !important; }
          section { padding: 40px 5vw !important; }
          .lf-hero { padding-top: 90px !important; padding-bottom: 40px !important; }
          .hero-btn-p, .hero-btn-s { padding: 10px 20px; font-size: 13px; }
        }
      `}</style>

      {/* ═══ HERO SECTION ═══ */}
      <section
        className="lf-hero"
        style={{
          minHeight: "80vh", display: "flex", alignItems: "center",
          paddingTop: 70, paddingBottom: 40, paddingLeft: "5vw", paddingRight: "5vw",
          background: "linear-gradient(135deg, #11315B 0%, #0e2647 50%, #162d50 100%)",
          position: "relative", overflow: "hidden", width: "100%",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,138,98,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -60, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(230,138,98,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div className="hero-inner" style={{ display: "flex", alignItems: "center", width: "100%", gap: "4vw" }}>
          <div style={{ flex: "1 1 55%" }}>
            <Reveal>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(230,138,98,0.12)", border: "1px solid rgba(230,138,98,0.25)",
                borderRadius: 20, padding: "6px 14px", marginBottom: 20,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#E68A62", animation: "pulse 2s infinite", display: "inline-block" }} />
                <span style={{ color: "#E68A62", fontSize: 13, fontWeight: 600 }}>Campus Lost & Found Portal</span>
              </div>
              <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", color: "#fff", fontWeight: 800, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-1px" }}>
                Lost &amp; Found,<br />
                <span style={{ color: "#E68A62" }}>Portal.</span>
              </h1>
            </Reveal>
            
            <Reveal delay={100}>
              <p style={{ fontSize: "clamp(14px, 1.6vw, 17px)", color: "#a8bdd4", marginBottom: 28, maxWidth: 520, lineHeight: 1.7 }}>
                A secure, transparent, and user-friendly portal for reporting, claiming, and managing lost and found items across your university campus. 

Empowering students, faculty to report lost belongings, discover found matches — building a safer, more connected, and responsible campus community where every lost item finds its way back home.
              </p>
            </Reveal>

            {/* CTA Buttons */}
            {!user && (
              <Reveal delay={150}>
                <div className="lf-hero-btns">
                  <Link className="hero-btn-p" to="/signup">Get Started →</Link>
                  <Link className="hero-btn-s" to="/login">Login</Link>
                </div>
              </Reveal>
            )}
            </div>
          {/* Video Section */}
          <div style={{ flex: "1 1 50%" }}>
    <div style={{ position: "relative", maxWidth: "900px", width: "100%", borderRadius: "20px", overflow: "hidden" }}>
      <video
        autoPlay
        loop
        muted
        playsInline
         disablePictureInPicture
        style={{ width: "100%", height: "auto", display: "block", objectFit: "contain", borderRadius: "20px", height: "500px",borderRadius: "20px" }}
      >
        <source src="/project.mp4" type="video/mp4" />
      </video>
    </div>
  </div>

</div>


      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ ...sectionPad, background: "#152c4a", width: "100%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <Reveal>
            <div style={{ color: "#E68A62", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Why Choose Us</div>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.5px" }}>Everything You Need</h2>
            <p style={{ color: "#7a92b0", fontSize: 15, maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>
              A complete ecosystem for managing lost and found items with transparency, speed, and security.
            </p>
          </Reveal>
          <div className="lf-feat-grid">
            <FeatureCard icon="📝" title="Quick Reporting"    desc="Report lost & found items using an intuitive form." delay={0} />
            <FeatureCard icon="✅" title="Verified Claims"    desc="Multi-step claim verification with admin oversight." delay={80} />
            <FeatureCard icon="🔔" title="Real-time Alerts"  desc="Instant notifications when matching items are reported." delay={160} />
            <FeatureCard icon="📦" title="Secure Returns"    desc="Coordinated pickup system for safe item return." delay={240} />
            <FeatureCard icon="📸" title="Photo Evidence"    desc="Upload photos to help verify ownership." delay={0} />
            <FeatureCard icon="📊" title="Status Tracking"   desc="Track your report from submitted to resolved." delay={80} />
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" style={{ ...sectionPad, background: "#11315B", width: "100%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <div className="lf-how-inner">
            <div className="lf-how-left">
              <Reveal>
                <div style={{ color: "#E68A62", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Process</div>
                <h2 style={{ color: "#fff", fontSize: "clamp(22px, 2.8vw, 30px)", fontWeight: 800, marginBottom: 10 }}>Simple Steps</h2>
                <p style={{ color: "#7a92b0", fontSize: 15, lineHeight: 1.65 }}>
                  From reporting to resolution — the entire process is streamlined to save time.
                </p>
              </Reveal>
            </div>
            <div className="lf-how-right">
              <StepCard num="1" title="Report an Item"  desc="Fill out a simple form with item details, category, and location." delay={0} />
              <StepCard num="2" title="Find Match"   desc="Our team verifies the listing and makes it searchable." delay={100} />
              <StepCard num="3" title="Submit a Claim"  desc="Found your item? Submit a claim with proof of ownership." delay={200} />
              <StepCard num="4" title="Admin Review" desc="Admin verifies your claim and cross-checks the identifiers you provided." delay={300} />
              <StepCard num="5" title="Collect Item" desc="When claim is approved, you'll be notified then collect your item from SSD office." delay={400} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ QUICK ACTIONS ═══ */}
      <section id="actions" style={{ ...sectionPad, background: "#152c4a", width: "100%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <Reveal>
            <div style={{ color: "#E68A62", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Take Action</div>
            <h2 style={{ color: "#fff", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.5px" }}>Quick Actions</h2>
            <p style={{ color: "#7a92b0", fontSize: 15, maxWidth: 560, lineHeight: 1.6, marginBottom: 40 }}>
              Report a lost or found item to help keep the campus safe.
            </p>
          </Reveal>
          <div className="lf-action-grid">
            <ActionCard icon="📝" title="Report Lost Item"  desc="Lost something? Fill out the form and we'll help you find it." to="/lost"         color="#ef4444" />
            <ActionCard icon="🔍" title="Report Found Item" desc="Found something? Report it here and help return it to the owner." to="/found"        color="#22c55e" />
            <ActionCard icon="🔗" title="Matched Items"     desc="Browse items that have been matched by our system." to="/matches" color="#3b82f6" />
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: "#011838", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 5vw 25px", width: "100%" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="lf-footer-top">
            {/* Brand */}
           <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#E68A62,#c96d44)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🎒</div>
                <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>SafeReturn</span>
              </div>
              <p style={{ color: "#5a7a9a", fontSize: 13, lineHeight: 1.65, maxWidth: 250 }}>
                Making lost and found management simple and effective for university communities.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Quick Links</h4>
              <Link className="footer-link" to="/lost">Report Lost</Link>
              <Link className="footer-link" to="/found">Report Found</Link>
              <Link className="footer-link" to="/matches">Matched Items</Link>
            </div>

            {/* Platform */}
            <div>
              <h4 style={{ color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Platform</h4>
              <span className="footer-span" onClick={() => navigate("/about")}>About Us</span>
              <span className="footer-span" onClick={() => navigate("/contact")}>Contact Us</span>
              <span className="footer-span" onClick={() => navigate("/feedback")}>Feedback</span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 18, textAlign: "center" }}>
            <p style={{ color: "#5a7a9a", fontSize: 15 }}>© 2025 SafeReturn — University Campus</p>
          </div>
        </div>
      </footer>
    </div>
  );
}