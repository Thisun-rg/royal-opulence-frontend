import { useState } from "react";
import "./RoomsPreview.css";

import ocean from "../assets/rooms/ocean.jpeg";
import deluxe from "../assets/rooms/deluxe.jpeg";
import suite from "../assets/rooms/suite.jpeg";
import executive from "../assets/rooms/executive.jpeg";

const rooms = [
  {
    title: "Premier Ocean View Room",
    desc: "Soothing ocean views with elegant interiors designed for ultimate comfort.",
    image: ocean,
  },
  {
    title: "Deluxe City View Room",
    desc: "Modern luxury overlooking the vibrant Colombo skyline.",
    image: deluxe,
  },
  {
    title: "Executive Suite",
    desc: "Spacious living with refined luxury for business and leisure.",
    image: suite,
  },
  {
    title: "Presidential Suite",
    desc: "An unmatched luxury experience with panoramic views and exclusivity.",
    image: executive,
  },
];

export default function RoomsPreview() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + rooms.length) % rooms.length);
  const next = () =>
    setIndex((index + 1) % rooms.length);

  return (
    <section className="rooms-preview">
      <h2>Recommended Room Types</h2>
      <p className="section-desc">
        Contemporary rooms and suites offering breathtaking views and refined comfort.
      </p>

      <div className="carousel">
  <button className="nav-btn" onClick={prev}>‹</button>

  <div className="carousel-track">
    {/* Previous */}
    <div className="room-card side">
      <img src={rooms[(index - 1 + rooms.length) % rooms.length].image} alt="" />
    </div>

    {/* Active */}
    <div className="room-card active">
      <img src={rooms[index].image} alt={rooms[index].title} />
      <div className="room-info">
        <h3>{rooms[index].title}</h3>
        <p>{rooms[index].desc}</p>
        <a href="/rooms" className="learn-link">Learn More</a>
      </div>
    </div>

    {/* Next */}
    <div className="room-card side">
      <img src={rooms[(index + 1) % rooms.length].image} alt="" />
    </div>
  </div>

  <button className="nav-btn" onClick={next}>›</button>
</div>


      <div className="indicator">
        {index + 1} / {rooms.length}
      </div>
    </section>
  );
}
