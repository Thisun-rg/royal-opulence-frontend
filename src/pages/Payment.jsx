import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { getPaymentById } from "../api/paymentApi";
import "./Payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  const { paymentId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getPaymentById(paymentId);

        // depending on your ApiResponse wrapper
        const p = res.data?.data ?? res.data;
        setPayment(p);

        // if you create stripe payment server-side, you should already have clientSecret
        if (p?.clientSecret) setClientSecret(p.clientSecret);
      } catch (e) {
        console.log(e);
        alert("Payment not found");
        navigate("/rooms");
      }
    };

    load();
  }, [paymentId, navigate]);

  if (!payment) return <div className="pay-wrap">Loading payment...</div>;

  return (
    <div className="pay-wrap">
      <div className="pay-card">
        <h2 className="pay-title">Secure Payment</h2>

        <div className="pay-summary">
          <div>
            <p className="label">Reservation</p>
            <p className="value">{payment.reservationId}</p>
          </div>
          <div>
            <p className="label">Amount</p>
            <p className="value">{payment.totalAmount} {payment.currency}</p>
          </div>
          <div>
            <p className="label">Status</p>
            <p className="value">{payment.status}</p>
          </div>
        </div>

        {/* Stripe checkout */}
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm paymentId={paymentId} />
          </Elements>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            <p>Stripe session not created yet.</p>
            <p>We will wire this once your backend returns clientSecret.</p>
          </div>
        )}
      </div>
    </div>
  );
}
