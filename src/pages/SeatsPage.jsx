import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";

function SeatsPage() {
  const [seats, setSeats] = useState([]);
  const [formData, setFormData] = useState({
    flight_id: "",
    seat_number: "",
    is_booked: false,
    booking_id: null,
  });

  useEffect(() => {
    fetch("https://roro-airlines-full-stack-1.onrender.com/seats")
      .then((response) => response.json())
      .then((data) => setSeats(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://roro-airlines-full-stack-1.onrender.com/seats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((newSeat) => setSeats([...seats, newSeat]))
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    fetch(`https://roro-airlines-full-stack-1.onrender.com/seats/${id}`, { method: "DELETE" })
      .then(() => setSeats(seats.filter((seat) => seat.id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="page-container">
      <h1>Seats</h1>

      {/* Form for Adding New Seat */}
      <form onSubmit={handleSubmit}>
        <input type="number" name="flight_id" placeholder="Flight ID" onChange={handleChange} required />
        <input type="text" name="seat_number" placeholder="Seat Number" onChange={handleChange} required />
        <select name="is_booked" onChange={handleChange}>
          <option value="false">Not Booked</option>
          <option value="true">Booked</option>
        </select>
        <input type="number" name="booking_id" placeholder="Booking ID (Optional)" onChange={handleChange} />
        <button className="add-btn" type="submit">Add Seat</button>
      </form>

      {/* TableComponent for Displaying Seats */}
      <TableComponent
        headers={["ID", "Flight ID", "Seat Number", "Is Booked", "Booking ID", "Actions"]}
        data={seats.map((seat) => ({
          id: seat.id,
          flight_id: seat.flight_id,
          seat_number: seat.seat_number,
          is_booked: seat.is_booked ? "Yes" : "No",
          booking_id: seat.booking_id || "N/A",
          actions: (
            <div className="action-btns">
              <button className="edit-btn">Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(seat.id)}>Delete</button>
            </div>
          ),
        }))}
      />
    </div>
  );
}

export default SeatsPage;
