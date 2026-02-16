import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate, useNavigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    roomName, roomImage, roomDescription,
    nights, roomsCount, guests,
    paymentId, clientSecret, totalAmount,
    checkIn, checkOut
  } = location.state || {};

  if (!paymentId || !clientSecret) return <Navigate to="/rooms" replace />;

  return (
    <div style={{ maxWidth: 980, margin: "3rem auto", padding: "1.5rem" }}>
      <h2 style={{ color: "#C5A253", marginBottom: 10 }}>Secure Checkout</h2>
      <div style={{ opacity: 0.9, marginBottom: 18 }}>
        Total: <strong>LKR {Number(totalAmount).toLocaleString()}</strong>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 24, alignItems: "start" }}>
        {/* LEFT: Room summary */}
        <div style={{ background: "white", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(197,162,83,0.55)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
          <img src={roomImage} alt={roomName} style={{ width: "100%", height: 260, objectFit: "cover" }} />
          <div style={{ padding: 18 }}>
            <h3>{roomName}</h3>
            <p style={{ marginTop: 8, opacity: 0.8 }}>{roomDescription}</p>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <div><strong>Dates:</strong> {checkIn} → {checkOut}</div>
              <div><strong>Rooms:</strong> {roomsCount}</div>
              <div><strong>Guests:</strong> {guests}</div>
              <div><strong>Nights:</strong> {nights}</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Stripe payment */}
        <div style={{ background: "white", borderRadius: 18, border: "1px solid rgba(197,162,83,0.55)", boxShadow: "0 10px 30px rgba(0,0,0,0.08)", padding: 18 }}>
          <h3 style={{ marginTop: 0, marginBottom: 10 }}>Card Payment</h3>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm paymentId={paymentId} />
          </Elements>
          <p style={{ fontSize: 12, opacity: 0.65, marginTop: 12 }}>
            Test card: <strong>4242 4242 4242 4242</strong> • Any future date • Any CVC
          </p>
        </div>
      </div>
    </div>
  );
}
