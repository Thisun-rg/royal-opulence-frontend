import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { markPaymentPaid } from "../api/paymentApi";

export default function CheckoutForm({ paymentId, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      alert("Stripe is still loading. Please wait 2 seconds and try again.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      alert("Card form not ready. Refresh and try again.");
      return;
    }

    setLoading(true);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (error) {
        alert(error.message);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        await markPaymentPaid(paymentId);
        window.location.href = "/success";
      } else {
        alert("Payment not completed: " + paymentIntent?.status);
      }
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const stripeReady = !!stripe && !!elements;

  return (
    <form onSubmit={handlePay}>
      <div
        style={{
          padding: "14px 14px",
          borderRadius: 14,
          border: "1px solid rgba(197,162,83,0.75)",
          background: "rgba(245,240,230,0.45)",
        }}
      >
        <CardElement
  options={{
    style: {
      base: {
        fontSize: "16px",
        color: "#1f1f1f",
        "::placeholder": { color: "#777" },
      },
      invalid: { color: "#b00020" },
    },
  }}
/>

      </div>

      <button
        type="submit"
        disabled={!stripeReady || loading}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "14px 16px",
          borderRadius: 14,
          border: "none",
          cursor: !stripeReady || loading ? "not-allowed" : "pointer",
          background: "var(--secondary)",
          color: "white",
          fontSize: "1rem",
          fontWeight: 700,
          opacity: !stripeReady || loading ? 0.6 : 1,
        }}
      >
        {!stripeReady ? "Loading Stripe..." : loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
