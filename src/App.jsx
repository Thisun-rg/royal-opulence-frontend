import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const isAuthenticated = () => !!localStorage.getItem("token");

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/rooms"
          element={isAuthenticated() ? <Rooms /> : <Navigate to="/login" />}
        />

        <Route
          path="/book"
          element={isAuthenticated() ? <Booking /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
