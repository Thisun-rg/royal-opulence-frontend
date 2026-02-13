import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBookingCheckout } from "../api/bookingApi";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        if (
          !state?.roomTypeId ||
          !state?.checkInDate ||
          !state?.checkOutDate
        ) {
          navigate("/rooms", { replace: true });
          return;
        }

        // ✅ Backend: POST /api/bookings/checkout
        const res = await createBooking({
          roomTypeId: state.roomTypeId,
          checkInDate: state.checkInDate,
          checkOutDate: state.checkOutDate,
          rooms: state.rooms ?? 1,
          guests: state.guests ?? 1,
        });

        const data = res?.data?.data ?? res?.data; // depending on your wrapper

        const paymentId = data?.paymentId;
        const clientSecret = data?.clientSecret;

        if (!paymentId || !clientSecret) {
          alert("Booking created, but paymentId/clientSecret missing. Check backend BookingResponse.");
          navigate("/rooms", { replace: true });
          return;
        }

        // ✅ go to checkout with stripe keys
        navigate("/checkout", {
          state: {
            paymentId,
            clientSecret,
            roomTypeId: state.roomTypeId,
            checkInDate: state.checkInDate,
            checkOutDate: state.checkOutDate,
            rooms: state.rooms ?? 1,
            guests: state.guests ?? 1,
          },
          replace: true,
        });
      } catch (err) {
        console.log(err);
        alert("Booking failed. Check availability / backend logs.");
        navigate("/rooms", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [state, navigate]);

  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h2 style={{ marginBottom: "1rem" }}>Preparing your checkout...</h2>
      <p>{loading ? "Creating reservation & payment..." : "Redirecting..."}</p>
    </div>
  );
}
