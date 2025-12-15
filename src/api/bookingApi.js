import api from "./axios";

export const createBooking = (data) => {
  return api.post("/api/bookings", data);
};
