import api from "./axiosInstance";

export const markPaymentSuccess = (id) =>
  api.patch(`/api/v1/payments/${id}/success`);

export const markPaymentFailed = (id) =>
  api.patch(`/api/v1/payments/${id}/failed`);
