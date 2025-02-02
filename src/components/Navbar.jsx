import React from "react";
import { Link } from "react-router-dom";
import "../styles/styles.css"; // Ensure styles are applied

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="navbar-logo">Roro International Airport Database</h2>
        <div className="navbar-links">
          <Link to="/" className="nav-button">Home</Link>
          <Link to="/airlines" className="nav-button">Airlines</Link>
          <Link to="/flights" className="nav-button">Flights</Link>
          <Link to="/passengers" className="nav-button">Passengers</Link>
          <Link to="/bookings" className="nav-button">Bookings</Link>
          <Link to="/seats" className="nav-button">Seats</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
