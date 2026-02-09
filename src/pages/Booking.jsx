import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//import { createBooking } from "../api/bookingApi";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        if (!state?.roomTypeId || !state?.checkInDate || !state?.checkOutDate) {
          navigate("/rooms");
          return;
        }

        // Backend creates reservation + payment (PENDING)
        const res = await createBooking({
          roomTypeId: state.roomTypeId,
          checkInDate: state.checkInDate,
          checkOutDate: state.checkOutDate,
          roomsRequested: state.rooms ?? 1,
          guestsRequested: state.guests ?? 1,
        });

        // Expect backend returns paymentId
        const paymentId = res?.data?.paymentId || res?.data?.data?.paymentId;
        if (!paymentId) {
          alert("Booking created but paymentId missing. Check API response.");
          navigate("/rooms");
          return;
        }

        navigate(`/pay/${paymentId}`);
      } catch (err) {
        console.log(err);
        alert("Booking failed. Check availability.");
        navigate("/rooms");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [state, navigate]);

  return (
    <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
      <h2 style={{ marginBottom: "1rem" }}>Creating your reservation...</h2>
      <p>{loading ? "Please wait..." : "Redirecting..."}</p>
    </div>
  );
}
