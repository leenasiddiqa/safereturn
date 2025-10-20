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
