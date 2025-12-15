import "./SpaSection.css";
import spaImage from "../assets/spa/spa.jpeg";

export default function SpaSection() {
  return (
    <section
      className="spa-section"
      style={{ backgroundImage: `url(${spaImage})` }}
    >
      <div className="spa-overlay">
        <div className="spa-content">
          <h2>Spa & Wellness</h2>
          <p className="spa-subtitle">
            A sanctuary of calm and rejuvenation
          </p>

          <p className="spa-description">
            Step into a world of serenity where time slows down. Our spa blends
            ancient healing traditions with modern luxury, offering bespoke
            treatments designed to restore balance, body, and soul.
          </p>

          <a href="/spa" className="spa-link">
            Discover Wellness
          </a>
        </div>
      </div>
    </section>
  );
}
