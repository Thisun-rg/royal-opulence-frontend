import "./HallsSection.css";

import ballroom from "../assets/halls/grand-ballroom/hall1.jpeg";
import banquet from "../assets/halls/banquet-hall/hall1.jpeg";
import conference from "../assets/halls/conference-hall/hall1.jpeg";
import garden from "../assets/halls/outdoor-pavilion/hall1.jpeg";

export default function HallsSection() {
  const halls = [
    {
      title: "Grand Ballroom",
      desc: "A majestic venue for weddings and large celebrations.",
      image: ballroom,
    },
    {
      title: "Royal Banquet Hall",
      desc: "Perfect for elegant dinners and formal gatherings.",
      image: banquet,
    },
    {
      title: "Executive Conference Hall",
      desc: "Designed for corporate meetings and conferences.",
      image: conference,
    },
    {
      title: "Garden Pavilion",
      desc: "An open-air luxury space for memorable events.",
      image: garden,
    },
  ];

  return (
    <section className="halls-section">
      <h2>Function Halls</h2>
      <p className="section-desc">
        From grand celebrations to professional gatherings, Royal Opulence
        offers refined venues designed for unforgettable experiences.
      </p>

      <div className="halls-grid">
        {halls.map((hall, index) => (
          <div className="hall-card" key={index}>
            <img src={hall.image} alt={hall.title} />
            <div className="hall-info">
              <h3>{hall.title}</h3>
              <p>{hall.desc}</p>
              <button className="learn-btn">Learn More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
