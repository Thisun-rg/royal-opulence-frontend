import "./RoomCard.css";

export default function RoomCard({
  room,
  nights,
  guests,
  roomsCount,
  searched,
  pricePerNight,
  total,
  onBook,
}) {
  return (
    <div className="roomCard">
      <div className="roomImage">
        <img src={room.image} alt={room.name} />
      </div>

      <div className="roomContent">
        <h3>{room.name}</h3>
        <p className="roomDesc">{room.description}</p>

        {/* Feature boxes */}
<div className="roomFeatures">
  {room.features?.map((f) => (
    <span key={f} className="featureChip">{f}</span>
  ))}
</div>


        <div className="roomMeta">
          <span>{guests} Guest{guests > 1 ? "s" : ""}</span>
          <span>{roomsCount} Room{roomsCount > 1 ? "s" : ""}</span>
        </div>

        <div className="priceBox">
          <span className="priceNight">
            LKR {pricePerNight.toLocaleString()} / night
          </span>

          {searched && nights > 0 && (
            <span className="priceTotal">
              Total ({nights} night{nights > 1 ? "s" : ""}):{" "}
              <strong>LKR {total.toLocaleString()}</strong>
            </span>
          )}
        </div>

        <button type="button" className="bookBtn" onClick={onBook}>
          Book Now
        </button>


      </div>
    </div>
  );
}
