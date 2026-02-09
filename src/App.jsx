import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

const isAuthenticated = () => !!localStorage.getItem("token");

function RequireAuth({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    // keep where user wanted to go (so after login we can redirect)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar /> {/* always show navbar */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Rooms is public */}
        <Route path="/rooms" element={<Rooms />} />

        <Route path="/login" element={<Login />} />

        {/* Protected pages */}
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          }
        />

        <Route
          path="/book"
          element={
            <RequireAuth>
              <Booking />
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
