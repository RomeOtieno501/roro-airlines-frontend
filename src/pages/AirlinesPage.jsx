import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';

function AirlinesPage() {
  const [airlines, setAirlines] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/airlines")
      .then(response => response.json())
      .then(data => setAirlines(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="page-container">
      <h1>Airlines</h1>
      <TableComponent headers={["ID", "Name", "Country"]} data={airlines} />
    </div>
  );
}

export default AirlinesPage;
