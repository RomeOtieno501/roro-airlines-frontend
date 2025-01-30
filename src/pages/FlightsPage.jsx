import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';

function FlightsPage() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/flights")
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1>Flights</h1>
      <TableComponent
        headers={["ID", "Airline ID", "Departure Time", "Arrival Time", "Origin", "Destination"]}
        data={flights}
      />
    </div>
  );
}

export default FlightsPage;
