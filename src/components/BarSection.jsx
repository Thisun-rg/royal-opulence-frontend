import "./BarSection.css";
import barImage from "../assets/bar/signature-bar.jpeg";

export default function BarSection() {
  return (
    <section
      className="bar-hero"
      style={{ backgroundImage: `url(${barImage})` }}
    >
      <div className="bar-overlay">
        <span className="bar-tag">Signature Experience</span>

        <h2>The Royal Opulence Bar</h2>

        <p>
          An elegant evening destination inspired by timeless luxury,
          handcrafted cocktails, and refined ambience.
        </p>

        <button className="bar-btn">Explore the Bar</button>
      </div>
    </section>
  );
}
