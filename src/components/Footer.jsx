import "./Footer.css";
import logo from "../assets/logo/royal-opulence-logo-gold.png";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter */}
      <div className="footer-newsletter">
        <p>Sign up for exclusive offers and royal experiences</p>
        <button>Subscribe</button>
      </div>

      {/* Main Footer */}
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <img src={logo} alt="Royal Opulence" />
          <p>
            Royal Opulence Hotel <br />
            Colombo, Sri Lanka
          </p>

          <div className="socials">
            <span>𝕏</span>
            <span>📘</span>
            <span>📸</span>
          </div>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Explore</h4>
          <a href="#">Rooms & Suites</a>
          <a href="#">Dining</a>
          <a href="#">Spa & Wellness</a>
          <a href="#">Events & Halls</a>
        </div>

        <div className="footer-links">
          <h4>Information</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
          <a href="#">FAQ</a>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h4>Reservations</h4>
          <p>T: +94 11 234 5678</p>
          <p>E: reservations@royalopulence.lk</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2025 Royal Opulence. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
