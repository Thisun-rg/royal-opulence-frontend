import api from "./axios";

export const getAvailableRooms = () => {
  return api.get("/api/rooms/available");
};
