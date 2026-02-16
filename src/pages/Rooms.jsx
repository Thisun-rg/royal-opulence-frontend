import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";
import "../styles/Rooms.css";
import { createBookingCheckout } from "../api/bookingApi";

import deluxeImg from "../assets/rooms/deluxe.jpeg";
import oceanImg from "../assets/rooms/ocean.jpeg";
import executiveImg from "../assets/rooms/executive.jpeg";
import presidentialImg from "../assets/rooms/suite.jpeg";

// ✅ Put YOUR real Mongo roomType _id values here
const ROOM_TYPE_IDS = {
  DELUXE: "69891ff0898eeda6b409fd86",
  OCEAN: "69891fff898eeda6b409fd87",
  EXECUTIVE: "6989201f898eeda6b409fd88",
  PRESIDENTIAL: "6989202c898eeda6b409fd89",
};

const ROOMS = [
  {
    id: "DELUXE",
    name: "Deluxe Room",
    description: "Elegant comfort with modern interiors & city views.",
    pricePerNight: 45000,
    image: deluxeImg,
    features: ["King Bed", "City View", "Wi-Fi", "Breakfast"],
  },
  {
    id: "OCEAN",
    name: "Premier Ocean View",
    description: "Breathtaking ocean views with premium furnishings.",
    pricePerNight: 65000,
    image: oceanImg,
    features: ["King Bed", "Ocean View", "Wi-Fi", "Breakfast"],
  },
  {
    id: "EXECUTIVE",
    name: "Executive Suite",
    description: "Spacious luxury suite for refined stays.",
    pricePerNight: 90000,
    image: executiveImg,
    features: ["Suite Living", "Ocean View", "Wi-Fi", "Breakfast"],
  },
  {
    id: "PRESIDENTIAL",
    name: "Presidential Suite",
    description: "Ultimate luxury with panoramic ocean views.",
    pricePerNight: 150000,
    image: presidentialImg,
    features: ["Panoramic View", "Lounge", "Wi-Fi", "Breakfast"],
  },
];

export default function Rooms() {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomsCount, setRoomsCount] = useState(1);
  const [guests, setGuests] = useState(2);
  const [searched, setSearched] = useState(false);
  const [loadingRoomId, setLoadingRoomId] = useState(null);

  const nights =
    checkIn && checkOut
      ? Math.max(0, (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      : 0;

  const handleSearch = () => {
    if (!checkIn || !checkOut || nights <= 0) {
      alert("Please select valid check-in and check-out dates");
      return;
    }
    setSearched(true);
  };

  const handleBookNow = async (room) => {
    try {
      if (!searched || nights <= 0) {
        alert("Please search with valid dates first.");
        return;
      }

      // ✅ must be logged in before calling checkout
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { state: { from: "/rooms" } });
        return;
      }

      const roomTypeId = ROOM_TYPE_IDS[room.id];
      if (!roomTypeId) {
        alert(`Missing Mongo roomTypeId mapping for ${room.id}`);
        return;
      }

      setLoadingRoomId(room.id);

      const res = await createBookingCheckout({
        roomTypeId,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        rooms: roomsCount,
        guests: guests,
      });

      const data = res?.data;
      const paymentId = data?.paymentId;
      const clientSecret = data?.clientSecret;
      const totalAmount = data?.totalAmount;

      if (!paymentId || !clientSecret) {
        console.log("Checkout init response:", data);
        alert("Checkout init missing paymentId/clientSecret. Check backend response.");
        return;
      }

      navigate("/checkout", {
        state: {
          room, // so checkout page can show image/desc
          roomTypeId,
          checkIn,
          checkOut,
          roomsCount,
          guests,
          paymentId,
          clientSecret,
          totalAmount,
        },
      });
    } catch (err) {
      console.log("Checkout init error:", err?.response?.data || err);
      alert(err?.response?.data?.message || "Checkout initialization failed.");
    } finally {
      setLoadingRoomId(null);
    }
  };

  return (
    <div className="roomsPage">
      <div className="roomsHeader">
        <h1>Our Rooms & Suites</h1>
        <p>Choose from four refined room categories designed for luxury stays.</p>
      </div>

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

      <div className="roomsGrid">
        {ROOMS.map((room) => {
          const guestMultiplier = guests === 2 ? 1.25 : 1;
          const pricePerNight = room.pricePerNight * guestMultiplier;
          const total = searched && nights > 0 ? pricePerNight * nights * roomsCount : null;

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
              loading={loadingRoomId === room.id}
            />
          );
        })}
      </div>
    </div>
  );
}
