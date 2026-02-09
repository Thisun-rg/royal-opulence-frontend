import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import "../styles/Rooms.css";
import { createBookingCheckout } from "../api/bookingApi"; // create this

// 🔴 Make sure these files EXIST with EXACT names
import deluxeImg from "../assets/rooms/deluxe.jpeg";
import oceanImg from "../assets/rooms/ocean.jpeg";
import executiveImg from "../assets/rooms/executive.jpeg";
import presidentialImg from "../assets/rooms/suite.jpeg";

const ROOMS = [
  {
    id: "DELUXE",
    name: "Deluxe Room",
    description: "Elegant comfort with modern interiors & city views.",
    pricePerNight: 45000,
    image: deluxeImg,
    features: ["King Bed", "Ocean View", "Wi-Fi", "Breakfast"]
  },
  {
    id: "OCEAN",
    name: "Premier Ocean View",
    description: "Breathtaking ocean views with premium furnishings.",
    pricePerNight: 65000,
    image: oceanImg,
    features: ["King Bed", "Ocean View", "Wi-Fi", "Breakfast"]
  },
  {
    id: "EXECUTIVE",
    name: "Executive Suite",
    description: "Spacious luxury suite for refined stays.",
    pricePerNight: 90000,
    image: executiveImg,
    features: ["King Bed", "Ocean View", "Wi-Fi", "Breakfast"]

  },
  {
    id: "PRESIDENTIAL",
    name: "Presidential Suite",
    description: "Ultimate luxury with panoramic ocean views.",
    pricePerNight: 150000,
    image: presidentialImg,
    features: ["King Bed", "Ocean View", "Wi-Fi", "Breakfast"]
  },
];

export default function Rooms() {
  const navigate = useNavigate();

  // 🔹 Global search inputs
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomsCount, setRoomsCount] = useState(1);
  const [guests, setGuests] = useState(2);

  const [searched, setSearched] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const handleSearch = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert("Please select valid check-in and check-out dates");
      return;
    }
    setSearched(true);
  };

  const handleBookNow = async (room) => {
  if (!searched || nights <= 0) {
    alert("Please Search with valid dates first.");
    return;
  }

  try {
    // call backend to create reservation + stripe PaymentIntent
    const res = await createBookingCheckout({
      roomTypeId: room.id,         // must match backend expects (code or id)
      checkInDate: checkIn,
      checkOutDate: checkOut,
      rooms: roomsCount,
      guests: guests,
    });

    // Backend should return these:
    const { paymentId, clientSecret, totalAmount, reservationId } = res.data;

    navigate("/checkout", {
      state: {
        paymentId,
        clientSecret,
        totalAmount,
        reservationId,

        // for UI display
        roomName: room.name,
        roomImage: room.image,
        roomDescription: room.description,
        nights,
        roomsCount,
        guests,
      },
    });
  } catch (err) {
    console.log(err);
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Checkout initialization failed";
    alert(msg);
  }
};



  return (
    <div className="roomsPage">
      {/* ===== HEADER ===== */}
      <div className="roomsHeader">
        <h1>Our Rooms & Suites</h1>
        <p>Choose from four refined room categories designed for luxury stays.</p>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="searchBar">
        <div className="searchField">
          <label>Check-in</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
        </div>

        <div className="searchField">
          <label>Check-out</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
        </div>

        <div className="searchField">
          <label>Rooms</label>
          <select value={roomsCount} onChange={(e) => setRoomsCount(Number(e.target.value))}>
            {[1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n} Room{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="searchField">
          <label>Guests</label>
          <select value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            <option value={1}>1 Guest</option>
            <option value={2}>2 Guests</option>
          </select>
        </div>

        <button className="searchBtn" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* ===== ROOMS GRID ===== */}
      <div className="roomsGrid">
        {ROOMS.map((room) => {
          const guestMultiplier = guests === 2 ? 1.25 : 1;
          const pricePerNight = room.pricePerNight * guestMultiplier;
          const total =
            searched && nights > 0
              ? pricePerNight * nights * roomsCount
              : null;

          return (
            <RoomCard
              key={room.id}
              room={room}
              nights={nights}
              guests={guests}
              roomsCount={roomsCount}
              searched={searched}
              pricePerNight={pricePerNight}
              total={total}
              onBook={() => handleBookNow(room)}
            />
          );
        })}
      </div>
    </div>
  );
}
