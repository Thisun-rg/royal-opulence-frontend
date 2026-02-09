import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const location = useLocation();

  // Coming from Rooms navigate(...)
  const room = location.state?.room;
  const roomTypeId = location.state?.roomTypeId;
  const checkIn = location.state?.checkIn;
  const checkOut = location.state?.checkOut;
  const roomsCount = location.state?.roomsCount;
  const guests = location.state?.guests;

  // These MUST come from your backend booking/payment init step
  const paymentId = location.state?.paymentId;
  const clientSecret = location.state?.clientSecret;
  const totalAmount = location.state?.totalAmount; // show total

  // If user directly opens /checkout without state
  if (!roomTypeId || !checkIn || !checkOut || !roomsCount || !guests) {
    return <Navigate to="/rooms" replace />;
  }

  // If you haven't implemented booking->stripe init yet, show a helpful message
  if (!paymentId || !clientSecret) {
    return (
      <div style={{ maxWidth: 900, margin: "3rem auto", padding: "1.5rem" }}>
        <h2 style={{ color: "var(--secondary)" }}>Secure Checkout</h2>
        <p style={{ marginTop: 10 }}>
          Checkout is missing Stripe details (paymentId / clientSecret).
          <br />
          Next step: initialize booking + stripe payment and navigate here with those values.
        </p>
        <div style={{ marginTop: 20, padding: 16, border: "1px solid #C5A253", borderRadius: 16 }}>
          <strong>Selected Room:</strong> {room?.name || roomTypeId}
          <div style={{ opacity: 0.8, marginTop: 6 }}>
            {checkIn} → {checkOut} • {roomsCount} room(s) • {guests} guest(s)
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 980, margin: "3rem auto", padding: "1.5rem" }}>
      <h2 style={{ color: "var(--secondary)", marginBottom: 10 }}>Secure Checkout</h2>
      <div style={{ opacity: 0.9, marginBottom: 18 }}>
        Total: <strong>LKR {Number(totalAmount || 0).toLocaleString()}</strong>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* LEFT: Room Summary */}
        <div
          style={{
            background: "white",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(197,162,83,0.55)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          }}
        >
          {room?.image && (
            <img
              src={room.image}
              alt={room.name}
              style={{ width: "100%", height: 260, objectFit: "cover" }}
            />
          )}

          <div style={{ padding: 18 }}>
            <h3 style={{ margin: 0 }}>{room?.name || "Selected Room"}</h3>
            <p style={{ marginTop: 8, opacity: 0.8 }}>
              {room?.description || "Your selected luxury stay."}
            </p>

            {/* Features */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              {room?.features?.map((f) => (
                <span
                  key={f}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(197,162,83,0.45)",
                    background: "rgba(197,162,83,0.10)",
                    fontSize: 13,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <div><strong>Dates:</strong> {checkIn} → {checkOut}</div>
              <div><strong>Rooms:</strong> {roomsCount}</div>
              <div><strong>Guests:</strong> {guests}</div>
            </div>
          </div>
        </div>

        {/* RIGHT: Stripe Payment */}
        <div
          style={{
            background: "white",
            borderRadius: 18,
            border: "1px solid rgba(197,162,83,0.55)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            padding: 18,
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 10 }}>Card Payment</h3>

          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm paymentId={paymentId} clientSecret={clientSecret} />
          </Elements>

          <p style={{ fontSize: 12, opacity: 0.65, marginTop: 12 }}>
            Test card: <strong>4242 4242 4242 4242</strong> • Any future date • Any CVC
          </p>
        </div>
      </div>
    </div>
  );
}
