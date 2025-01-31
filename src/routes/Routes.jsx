import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AirlinesPage from "../pages/AirlinesPage";
import BookingsPage from "../pages/BookingsPage";
import FlightsPage from "../pages/FlightsPage";
import PassengersPage from "../pages/PassengersPage";
import SeatsPage from "../pages/SeatsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/airlines" element={<AirlinesPage />} />
      <Route path="/bookings" element={<BookingsPage />} />
      <Route path="/flights" element={<FlightsPage />} />
      <Route path="/passengers" element={<PassengersPage />} />
      <Route path="/seats" element={<SeatsPage />} />
    </Routes>
  );
}

export default AppRoutes;
