import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmPayment } from "../api/paymentApi"; // API call to update backend

export default function CheckoutForm({ paymentId }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      elements._clientSecret || "",
      { payment_method: { card: cardElement } }
    );

    if (error) {
      alert(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      // Update backend payment status
      await confirmPayment(paymentId);
      navigate("/booking-success");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ hidePostalCode: true }} />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: 16, padding: "10px 25px", borderRadius: 8, background: "#C5A253", color: "#fff", border: "none", cursor: "pointer" }}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
