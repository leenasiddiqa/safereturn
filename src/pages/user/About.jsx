import React from "react";
import "./About.css";

const About = () => {
  // Array of emoji/icons for each point (optional)
  const icons = ["🏫", "🎯", "⭐", "⚙️"];

  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About SafeReturn</h1>
        <p className="about-subtitle">
          Your trusted campus lost & found platform — built with transparency,
          security, and care.
        </p>

        <div className="about-points">
          <div className="about-point">
            <div className="about-point-number">{icons[0]}</div>
            <div className="about-point-text">
              <h3>Welcome to SafeReturn</h3>
              <p>
                A secure, transparent portal for reporting, claiming, and
                managing lost and found items at your university. Empowering
                students, staff, and admins for a safer, more responsible
                campus.
              </p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point-number">{icons[1]}</div>
            <div className="about-point-text">
              <h3>Our Mission</h3>
              <p>
                Helping people reunite with their lost belongings through our
                efficient tracking system.
              </p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point-number">{icons[2]}</div>
            <div className="about-point-text">
              <h3>Features</h3>
              <p>
                Report lost items • Claim found items • Track item status •
                Secure authentication • Admin dashboard for management
              </p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point-number">{icons[3]}</div>
            <div className="about-point-text">
              <h3>How It Works</h3>
              <p>
                Simply create an account, report lost items or browse found
                items, and submit claims with verification.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="about-footer-spacing"></div>
    </div>
  );
};

export default About;
