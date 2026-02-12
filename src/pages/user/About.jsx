<<<<<<< HEAD
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
      </div>


      <div className="about-content">
        <h1 className="about-title">About SafeReturn</h1>
        
        <div className="about-points">
          <div className="about-point">
            <div className="about-point-number">1</div>
            <div className="about-point-text">
              <h3>Welcome to SafeReturn</h3>
              <p>A secure, transparent portal for reporting, claiming, and managing lost and found items at your university. Empowering students, staff, and admins for a safer, more responsible campus.</p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point-number">2</div>
            <div className="about-point-text">
              <h3>Our Mission</h3>
              <p>Helping people reunite with their lost belongings through our efficient tracking system.</p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point-number">3</div>
            <div className="about-point-text">
              <h3>Features</h3>
              <p>Report lost items • Claim found items • Track item status • Secure authentication • Admin dashboard for management</p>
            </div>
          </div>

          <div className="about-point">
            <div className="about-point-number">4</div>
            <div className="about-point-text">
              <h3>How It Works</h3>
              <p>Simply create an account, report lost items or browse found items, and submit claims with verification.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-footer-spacing"></div>
    </div>
  );
};

export default About;
=======
import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      {/* Divider */}
      <div className="about-divider-container">
        <hr className="about-divider" />
      </div>

      {/* About Content */}
      <section className="about-content">
        <h2 className="about-title">About Us</h2>

        {/* Numbered Points */}
        <div className="about-points">
          {[1, 2, 3, 4].map((number) => (
            <div key={number} className="about-point">
              <div className="about-point-number">{number}</div>
              <div className="about-point-text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Spacing */}
      <div className="about-footer-spacing"></div>
    </div>
  );
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
