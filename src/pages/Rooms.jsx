import { useEffect, useState } from "react";
import { getAvailableRooms } from "../api/roomApi";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getAvailableRooms()
      .then(res => setRooms(res.data))
      .catch(() => alert("Failed to load rooms"));
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>

      {rooms.length === 0 && <p>No rooms available</p>}

      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            Room {room.roomNumber} | Type: {room.roomTypeId} | Status: {room.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
