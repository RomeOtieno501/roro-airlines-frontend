import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";

function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [formData, setFormData] = useState({
    flight_id: "",
    seat_number: "",
    is_booked: false,
    booking_id: "",
  });
  const [editingSeat, setEditingSeat] = useState(null);

  // Fetch all seats
  useEffect(() => {
    fetchSeats();
  }, []);

  const fetchSeats = () => {
    fetch("http://127.0.0.1:5555/seats")
      .then((response) => response.json())
      .then((data) => setSeats(data))
      .catch((err) => console.error("Error fetching seats:", err));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission for adding or updating a seat
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingSeat) {
      handleUpdateSeat(editingSeat.id);
    } else {
      handleAddSeat();
    }
  };

  // Add a new seat
  const handleAddSeat = () => {
    fetch("http://127.0.0.1:5555/seats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchSeats();
        setFormData({ flight_id: "", seat_number: "", is_booked: false, booking_id: "" });
      })
      .catch((err) => console.error("Error adding seat:", err));
  };

  // Edit seat
  const handleEditSeat = (seat) => {
    setEditingSeat(seat);
    setFormData({
      flight_id: seat.flight_id,
      seat_number: seat.seat_number,
      is_booked: seat.is_booked,
      booking_id: seat.booking_id || "",
    });
  };

  // Update seat
  const handleUpdateSeat = (id) => {
    fetch(`http://127.0.0.1:5555/seats/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        fetchSeats();
        setEditingSeat(null);
        setFormData({ flight_id: "", seat_number: "", is_booked: false, booking_id: "" });
      })
      .catch((err) => console.error("Error updating seat:", err));
  };

  // Delete seat
  const handleDeleteSeat = (id) => {
    fetch(`http://127.0.0.1:5555/seats/${id}`, { method: "DELETE" })
      .then(() => fetchSeats())
      .catch((err) => console.error("Error deleting seat:", err));
  };

  return (
    <div className="page-container">
      <h1>Seats</h1>

      {/* Seat Form */}
      <form onSubmit={handleSubmit} className="crud-form">
        <input type="number" name="flight_id" placeholder="Flight ID" value={formData.flight_id} onChange={handleChange} required />
        <input type="text" name="seat_number" placeholder="Seat Number" value={formData.seat_number} onChange={handleChange} required />
        <label>
          <input type="checkbox" name="is_booked" checked={formData.is_booked} onChange={handleChange} /> Is Booked?
        </label>
        <input type="number" name="booking_id" placeholder="Booking ID (optional)" value={formData.booking_id} onChange={handleChange} />
        <button type="submit">{editingSeat ? "Update Seat" : "Add Seat"}</button>
      </form>

      {/* Seats Table */}
      <TableComponent
        headers={["ID", "Flight ID", "Seat Number", "Is Booked", "Booking ID", "Actions"]}
        data={seats}
        actions={(seat) => (
          <>
            <button className="edit-btn" onClick={() => handleEditSeat(seat)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDeleteSeat(seat.id)}>Delete</button>
          </>
        )}
      />
    </div>
  );
}

export default SeatsPage;
