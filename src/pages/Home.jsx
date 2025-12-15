import "./Home.css";
import { useEffect } from "react";
import heroVideo from "../assets/video/hero.mp4";
import DiningSection from "../components/DiningSection";
import RoomsPreview from "../components/RoomsPreview";
import HallsSection from "../components/HallsSection";
import BarSection from "../components/BarSection";
import PoolSection from "../components/PoolSection";
import SpaSection from "../components/SpaSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>

      {/* HERO SECTION */}
      <section className="home">
        <video className="hero-video" autoPlay muted loop>
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="hero-overlay">
          <h1>A Luxury Stay Awaits</h1>
          <p>Experience the pinnacle of elegance and comfort.</p>
          <button className="hero-btn">Book Now</button>
        </div>
      </section>

      {/* DINING SECTION */}
      <DiningSection />
        {/* ROOMS PREVIEW SECTION */}
        <RoomsPreview />
        {/* HALLS SECTION */}
        <HallsSection />
        {/* BAR SECTION */}
        <BarSection />
        {/* POOL SECTION */}
        <PoolSection />
        {/* SPA SECTION */}
        <SpaSection /> 
        {/* FOOTER SECTION */}
        <Footer />
    </>
  );
}

