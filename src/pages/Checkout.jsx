import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, Navigate } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import "./Checkout.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Checkout() {
  const location = useLocation();

  // Grab state passed from Rooms page
  const {
    roomName,
    roomImage,
    roomDescription,
    nights,
    roomsCount,
    guests,
    paymentId,
    clientSecret,
    totalAmount,
  } = location.state || {};

  // Redirect if required state is missing
  if (!paymentId || !clientSecret || !roomName || !nights) {
    return <Navigate to="/rooms" replace />;
  }

  return (
    <div className="checkout-page">
      <h2 className="checkout-title">Secure Checkout</h2>
      <p className="checkout-total">
        Total: <strong>LKR {Number(totalAmount).toLocaleString()}</strong>
      </p>

      <div className="checkout-grid">
        {/* LEFT: Room Summary */}
        <div className="checkout-room-card">
          {roomImage && (
            <img
              src={roomImage}
              alt={roomName}
              className="checkout-room-image"
            />
          )}
          <div className="checkout-room-info">
            <h3>{roomName}</h3>
            <p>{roomDescription}</p>
            <div className="checkout-room-details">
              <p>
                <strong>Dates:</strong> {location.state.checkIn} →{" "}
                {location.state.checkOut}
              </p>
              <p>
                <strong>Rooms:</strong> {roomsCount}
              </p>
              <p>
                <strong>Guests:</strong> {guests}
              </p>
              <p>
                <strong>Nights:</strong> {nights}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Stripe Payment */}
        <div className="checkout-payment-card">
          <h3>Card Payment</h3>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm paymentId={paymentId} clientSecret={clientSecret} />
          </Elements>
          <p className="test-card-note">
            Test card: <strong>4242 4242 4242 4242</strong> • Any future date •
            Any CVC
          </p>
        </div>
      </div>
    </div>
  );
}
