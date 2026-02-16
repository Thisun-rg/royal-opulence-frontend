import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Invoice from "./pages/Invoice";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/book"
          element={
            <RequireAuth>
              <Booking />
            </RequireAuth>
          }
        />

        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/success/:paymentId" element={<Success />} />

<Route
  path="/invoice"
  element={
    <RequireAuth>
      <Invoice />
    </RequireAuth>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}
