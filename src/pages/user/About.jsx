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