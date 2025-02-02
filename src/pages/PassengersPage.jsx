import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";

function PassengersPage() {
  const [passengers, setPassengers] = useState([]);
  const [newPassenger, setNewPassenger] = useState({ name: "", email: "" });
  const [editingPassenger, setEditingPassenger] = useState(null);

  // Fetch all passengers
  useEffect(() => {
    fetchPassengers();
  }, []);

  const fetchPassengers = () => {
    fetch("https://roro-airlines-full-stack-1.onrender.com/passengers")
      .then((response) => response.json())
      .then((data) => setPassengers(data))
      .catch((err) => console.error(err));
  };

  // Create new passenger
  const createPassenger = () => {
    fetch("https://roro-airlines-full-stack-1.onrender.com/passengers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPassenger),
    })
      .then((response) => response.json())
      .then(() => {
        fetchPassengers();
        setNewPassenger({ name: "", email: "" });
      })
      .catch((err) => console.error(err));
  };

  // Update passenger
  const updatePassenger = () => {
    fetch(`https://roro-airlines-full-stack-1.onrender.com/passengers/${editingPassenger.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingPassenger),
    })
      .then((response) => response.json())
      .then(() => {
        fetchPassengers();
        setEditingPassenger(null);
      })
      .catch((err) => console.error(err));
  };

  // Delete passenger
  const deletePassenger = (id) => {
    fetch(`https://roro-airlines-full-stack-1.onrender.com/passengers/${id}`, {
      method: "DELETE",
    })
      .then(() => fetchPassengers())
      .catch((err) => console.error(err));
  };

  return (
    <div className="page-container">
      <h1>Passengers</h1>
      <TableComponent
        headers={["ID", "Name", "Email", "Actions"]}
        data={passengers.map((passenger) => ({
          ...passenger,
          actions: (
            <>
              <button onClick={() => setEditingPassenger(passenger)}>Edit</button>
              <button onClick={() => deletePassenger(passenger.id)}>Delete</button>
            </>
          ),
        }))}
      />

      {/* Create Passenger Form */}
      <h2>Add New Passenger</h2>
      <input
        type="text"
        placeholder="Name"
        value={newPassenger.name}
        onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newPassenger.email}
        onChange={(e) => setNewPassenger({ ...newPassenger, email: e.target.value })}
      />
      <button onClick={createPassenger}>Add Passenger</button>

      {/* Update Passenger Form */}
      {editingPassenger && (
        <div>
          <h2>Edit Passenger</h2>
          <input
            type="text"
            value={editingPassenger.name}
            onChange={(e) => setEditingPassenger({ ...editingPassenger, name: e.target.value })}
          />
          <input
            type="email"
            value={editingPassenger.email}
            onChange={(e) => setEditingPassenger({ ...editingPassenger, email: e.target.value })}
          />
          <button onClick={updatePassenger}>Update Passenger</button>
          <button onClick={() => setEditingPassenger(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default PassengersPage;
