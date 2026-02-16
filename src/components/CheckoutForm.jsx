import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function CheckoutForm({ paymentId, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const card = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        { payment_method: { card } }
      );

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        // ✅ mark payment success in backend (PATCH!)
        await api.patch(`/api/v1/payments/${paymentId}/success`);

        // ✅ IMPORTANT: redirect with paymentId param
        navigate(`/success/${paymentId}`, { replace: true });
        return;
      }

      alert("Payment not completed: " + paymentIntent?.status);
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} style={{ marginTop: "1.5rem" }}>
      <div style={{ padding: "1rem", borderRadius: 12, border: "1px solid #C5A253" }}>
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: "1rem",
          width: "100%",
          padding: "12px 16px",
          borderRadius: 14,
          border: "none",
          cursor: "pointer",
          background: "var(--secondary)",
          color: "white",
          fontSize: "1rem",
          fontWeight: 600,
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
