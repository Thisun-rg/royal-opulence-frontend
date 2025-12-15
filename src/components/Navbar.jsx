import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/royal-opulence-logo-gold.png";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Royal Opulence Logo" />
        </Link>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Rooms</Link></li>
        <li><a href="#dining">Dining</a></li>
        <li><a href="#spa">Spa</a></li>
        <li><a href="#events">Events</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className="nav-actions">
        {!isAuthenticated && (
          <Link className="account-btn" to="/login">Sign In</Link>
        )}

        {isAuthenticated && (
          <>
            <Link className="book-btn" to="/book">Book Now</Link>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
