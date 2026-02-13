import api from "./axiosInstance";

export const createBookingCheckout = (payload) => api.post("/api/bookings/checkout", payload);
