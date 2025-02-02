import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";

function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [newFlight, setNewFlight] = useState({
    airline_id: "",
    departure_time: "",
    arrival_time: "",
    origin: "",
    destination: "",
  });
  const [editingFlight, setEditingFlight] = useState(null);

  // Fetch Flights
  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = () => {
    fetch("https://roro-airlines-full-stack-1.onrender.com/flights")
      .then(response => response.json())
      .then(data => setFlights(data))
      .catch(err => console.error(err));
  };

  // Create Flight
  const handleCreateFlight = (e) => {
    e.preventDefault();
    fetch("https://roro-airlines-full-stack-1.onrender.com/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFlight),
    })
      .then(response => response.json())
      .then(() => {
        fetchFlights();
        setNewFlight({ airline_id: "", departure_time: "", arrival_time: "", origin: "", destination: "" });
      })
      .catch(err => console.error(err));
  };

  // Update Flight
  const handleUpdateFlight = (e) => {
    e.preventDefault();
    fetch(`https://roro-airlines-full-stack-1.onrender.com/flights/${editingFlight.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingFlight),
    })
      .then(response => response.json())
      .then(() => {
        fetchFlights();
        setEditingFlight(null);
      })
      .catch(err => console.error(err));
  };

  // Delete Flight
  const handleDeleteFlight = (id) => {
    fetch(`https://roro-airlines-full-stack-1.onrender.com/flights/${id}`, { method: "DELETE" })
      .then(() => fetchFlights())
      .catch(err => console.error(err));
  };

  return (
    <div className="page-container">
      <h1>Flights</h1>

      {/* Form for Creating & Editing Flights */}
      <form onSubmit={editingFlight ? handleUpdateFlight : handleCreateFlight}>
        <input
          type="text"
          placeholder="Airline ID"
          value={editingFlight ? editingFlight.airline_id : newFlight.airline_id}
          onChange={(e) =>
            editingFlight
              ? setEditingFlight({ ...editingFlight, airline_id: e.target.value })
              : setNewFlight({ ...newFlight, airline_id: e.target.value })
          }
          required
        />
        <input
          type="datetime-local"
          placeholder="Departure Time"
          value={editingFlight ? editingFlight.departure_time : newFlight.departure_time}
          onChange={(e) =>
            editingFlight
              ? setEditingFlight({ ...editingFlight, departure_time: e.target.value })
              : setNewFlight({ ...newFlight, departure_time: e.target.value })
          }
          required
        />
        <input
          type="datetime-local"
          placeholder="Arrival Time"
          value={editingFlight ? editingFlight.arrival_time : newFlight.arrival_time}
          onChange={(e) =>
            editingFlight
              ? setEditingFlight({ ...editingFlight, arrival_time: e.target.value })
              : setNewFlight({ ...newFlight, arrival_time: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Origin"
          value={editingFlight ? editingFlight.origin : newFlight.origin}
          onChange={(e) =>
            editingFlight
              ? setEditingFlight({ ...editingFlight, origin: e.target.value })
              : setNewFlight({ ...newFlight, origin: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Destination"
          value={editingFlight ? editingFlight.destination : newFlight.destination}
          onChange={(e) =>
            editingFlight
              ? setEditingFlight({ ...editingFlight, destination: e.target.value })
              : setNewFlight({ ...newFlight, destination: e.target.value })
          }
          required
        />
        <button type="submit">{editingFlight ? "Update" : "Add"} Flight</button>
        {editingFlight && <button onClick={() => setEditingFlight(null)}>Cancel</button>}
      </form>

      {/* Table with Action Buttons */}
      <TableComponent
        headers={["ID", "Airline ID", "Departure Time", "Arrival Time", "Origin", "Destination", "Actions"]}
        data={flights.map((flight) => ({
          ...flight,
          actions: (
            <>
              <button onClick={() => setEditingFlight(flight)}>Edit</button>
              <button onClick={() => handleDeleteFlight(flight.id)}>Delete</button>
            </>
          ),
        }))}
      />
    </div>
  );
}

export default FlightsPage;
