import api from "./axiosInstance";

export const createStripePayment = (payload) =>
  api.post("/api/v1/payments/stripe", payload);

export const markPaymentPaid = (paymentId) =>
  api.patch(`/api/v1/payments/${paymentId}/success`);
