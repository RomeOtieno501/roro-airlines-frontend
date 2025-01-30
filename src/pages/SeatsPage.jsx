import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';

function SeatsPage() {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/seats")
      .then(response => response.json())
      .then(data => setSeats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1>Seats</h1>
      <TableComponent headers={["ID", "Flight ID", "Seat Number", "Is Booked", "Booking ID"]} data={seats} />
    </div>
  );
}

export default SeatsPage;
