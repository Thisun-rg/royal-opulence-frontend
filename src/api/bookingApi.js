import api from "./axiosInstance";

// This endpoint must match your backend controller
export const createBookingCheckout = (payload) =>
  api.post("/api/bookings/checkout", payload);
