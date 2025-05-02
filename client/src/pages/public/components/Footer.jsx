import React, { useEffect } from "react";
import feather from "feather-icons";

const Footer = () => {
  useEffect(() => {
    feather.replace();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Left Column */}
          <div className="footer-col">
            <h3 className="footer-logo">
              <span className="text-primary">Tech</span>Kisan
            </h3>
            <p className="footer-description">
              Empowering farmers with access to verified government schemes, eligibility checks, and educational resources. Our mission is to simplify support for India’s agricultural heroes.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <i data-feather="facebook"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i data-feather="twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i data-feather="instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i data-feather="youtube"></i>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="footer-col">
            <h3 className="footer-heading">We're here to help</h3>
            <ul className="footer-contact">
              <li>Guidance on applying for schemes</li>
              <li>Support for rural & small-scale farmers</li>
              <li>Email: support@agrischemes.in</li>
              <li>Helpline: 1800-123-456 (Mon–Sat, 9 AM–6 PM)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} AgriSchemes. Built to support the backbone of India — our farmers.
          </p>
          <div className="footer-legal">
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/disclaimer">Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
