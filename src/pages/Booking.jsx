import { useState } from "react";
import { createBooking } from "../api/bookingApi";

export default function Booking() {
  const [roomTypeId, setRoomTypeId] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const res = await createBooking({
        roomTypeId,
        checkInDate,
        checkOutDate,
      });
      alert(`Room booked successfully!\nRoom ID: ${res.data.roomId}`);
    } catch {
      alert("Booking failed");
    }
  };

  return (
    <div>
      <h2>Book a Room</h2>

      <form onSubmit={handleBooking}>
        <input
          placeholder="Room Type ID"
          onChange={e => setRoomTypeId(e.target.value)}
        />

        <input
          type="date"
          onChange={e => setCheckInDate(e.target.value)}
        />

        <input
          type="date"
          onChange={e => setCheckOutDate(e.target.value)}
        />

        <button>Book</button>
      </form>
    </div>
  );
}
