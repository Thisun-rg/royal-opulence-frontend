import "./PoolSection.css";

import pool1 from "../assets/pool/pool1.jpeg";
import pool2 from "../assets/pool/pool2.jpeg";
import pool3 from "../assets/pool/pool3.jpeg";
import pool4 from "../assets/pool/pool4.jpeg";

export default function PoolSection() {
  return (
    <section className="pool-section">
      <div className="pool-header">
        <h2>Infinity Outdoor Pool</h2>
        <p>
          Bask under the Colombo sun in our elegant outdoor pool, surrounded by
          tranquil views and refined comfort.
        </p>
      </div>

      <div className="pool-gallery">
        <img src={pool1} alt="Royal Opulence Pool" />
        <img src={pool2} alt="Royal Opulence Pool" />
        <img src={pool3} alt="Royal Opulence Pool" />
        <img src={pool4} alt="Royal Opulence Pool" />
      </div>
    </section>
  );
}
