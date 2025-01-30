import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/airlines">Airlines</Link></li>
        <li><Link to="/flights">Flights</Link></li>
        <li><Link to="/passengers">Passengers</Link></li>
        <li><Link to="/bookings">Bookings</Link></li>
        <li><Link to="/seats">Seats</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
