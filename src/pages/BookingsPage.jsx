import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({ passenger_id: "", booking_date: "" });
  const [editingBooking, setEditingBooking] = useState(null);

  // Fetch Bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    fetch("http://127.0.0.1:5555/bookings")
      .then(response => response.json())
      .then(data => setBookings(data))
      .catch(error => console.error(error));
  };

  // Create Booking
  const handleCreateBooking = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5555/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then(response => response.json())
      .then(() => {
        fetchBookings();
        setNewBooking({ passenger_id: "", booking_date: "" });
      })
      .catch(error => console.error(error));
  };

  // Update Booking
  const handleUpdateBooking = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5555/bookings/${editingBooking.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingBooking),
    })
      .then(response => response.json())
      .then(() => {
        fetchBookings();
        setEditingBooking(null);
      })
      .catch(error => console.error(error));
  };

  // Delete Booking
  const handleDeleteBooking = (id) => {
    fetch(`http://127.0.0.1:5555/bookings/${id}`, { method: "DELETE" })
      .then(() => fetchBookings())
      .catch(error => console.error(error));
  };

  return (
    <div className="page-container">
      <h1>Bookings</h1>

      {/* Form for Creating & Editing */}
      <form onSubmit={editingBooking ? handleUpdateBooking : handleCreateBooking}>
        <input
          type="text"
          placeholder="Passenger ID"
          value={editingBooking ? editingBooking.passenger_id : newBooking.passenger_id}
          onChange={(e) =>
            editingBooking
              ? setEditingBooking({ ...editingBooking, passenger_id: e.target.value })
              : setNewBooking({ ...newBooking, passenger_id: e.target.value })
          }
          required
        />
        <input
          type="date"
          value={editingBooking ? editingBooking.booking_date : newBooking.booking_date}
          onChange={(e) =>
            editingBooking
              ? setEditingBooking({ ...editingBooking, booking_date: e.target.value })
              : setNewBooking({ ...newBooking, booking_date: e.target.value })
          }
          required
        />
        <button type="submit">{editingBooking ? "Update" : "Add"} Booking</button>
        {editingBooking && <button onClick={() => setEditingBooking(null)}>Cancel</button>}
      </form>

      {/* Table with Action Buttons */}
      <TableComponent
        headers={["ID", "Passenger ID", "Booking Date", "Actions"]}
        data={bookings.map((booking) => ({
          ...booking,
          actions: (
            <>
              <button onClick={() => setEditingBooking(booking)}>Edit</button>
              <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
            </>
          ),
        }))}
      />
    </div>
  );
};

export default BookingsPage;
