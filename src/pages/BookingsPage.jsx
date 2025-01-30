import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';

function PassengersPage() {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/passengers")
      .then(response => response.json())
      .then(data => setPassengers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1>Passengers</h1>
      <TableComponent headers={["ID", "Name", "Email"]} data={passengers} />
    </div>
  );
}

export default PassengersPage;
