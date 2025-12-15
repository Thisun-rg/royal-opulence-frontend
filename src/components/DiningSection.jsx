import "./DiningSection.css";

import buffet from "../assets/dining/horizon-buffet/buffet1.jpeg";
import italian from "../assets/dining/la-bella-vita-italian/italian1.jpeg";
import indian from "../assets/dining/spice-route-indian/indian1.jpeg";
import coffee from "../assets/dining/brew-lounge-coffee/coffee1.jpeg";

export default function DiningSection() {
  return (
    <section className="dining-home">
      <h2>Exquisite Dining Experiences</h2>
      <p className="section-desc">
        Savor world-class cuisine crafted by master chefs in elegant settings.
      </p>

      <div className="dining-cards">
        <DiningCard
          image={buffet}
          title="The Horizon"
          desc="An international buffet featuring global flavors and live cooking stations."
          link="/dining/buffet"
        />

        <DiningCard
          image={italian}
          title="La Bella Vita"
          desc="Fine Italian dining with handcrafted pasta and premium wines."
          link="/dining/italian"
        />

        <DiningCard
          image={indian}
          title="Spice Route"
          desc="Authentic Indian cuisine infused with rich spices and tradition."
          link="/dining/indian"
        />

        <DiningCard
          image={coffee}
          title="The Brew Lounge"
          desc="Artisan coffee, signature desserts, and a relaxed lounge atmosphere."
          link="/dining/coffee"
        />
      </div>
    </section>
  );
}

function DiningCard({ image, title, desc, link }) {
  return (
    <div className="dining-card">
      <img src={image} alt={title} />
      <div className="card-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <a href={link} className="learn-btn">Learn More</a>
      </div>
    </div>
  );
}
