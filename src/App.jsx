import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AirlinesPage from './pages/AirlinesPage';
import FlightsPage from './pages/FlightsPage';
import PassengersPage from './pages/PassengersPage';
import BookingsPage from './pages/BookingsPage';
import SeatsPage from './pages/SeatsPage';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/airlines" element={<AirlinesPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/seats" element={<SeatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
