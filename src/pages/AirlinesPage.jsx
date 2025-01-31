import React, { useEffect, useState } from 'react';
import axios from "axios";
import TableComponent from '../components/TableComponent';

function AirlinesPage() {
    const [airlines, setAirlines] = useState([]);
    const [newAirline, setNewAirline] = useState({ name: "", country: "" });
    const [editingAirline, setEditingAirline] = useState(null); // Track airline being edited
  
    // Fetch airlines from backend
    useEffect(() => {
      fetch("http://127.0.0.1:5555/airlines")
        .then(response => response.json())
        .then(data => setAirlines(data))
        .catch(err => console.error("Error fetching airlines:", err));
    }, []);
  
    // Add a new airline
    const addAirline = () => {
      fetch("http://127.0.0.1:5555/airlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAirline),
      })
        .then(response => response.json())
        .then(data => {
          setAirlines([...airlines, data]); // Update UI
          setNewAirline({ name: "", country: "" }); // Reset form
        })
        .catch(err => console.error("Error adding airline:", err));
    };
  
    // Update an airline
    const updateAirline = (id) => {
      fetch(`http://127.0.0.1:5555/airlines/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingAirline),
      })
        .then(response => response.json())
        .then(updatedAirline => {
          setAirlines(airlines.map(a => (a.id === id ? updatedAirline : a))); // Update UI
          setEditingAirline(null); // Reset editing
        })
        .catch(err => console.error("Error updating airline:", err));
    };
  
    // Delete an airline
    const deleteAirline = (id) => {
      fetch(`http://127.0.0.1:5555/airlines/${id}`, { method: "DELETE" })
        .then(() => {
          setAirlines(airlines.filter(a => a.id !== id)); // Remove from UI
        })
        .catch(err => console.error("Error deleting airline:", err));
    };
  

    return (
        <div className="page-container">
          <h1>Airlines</h1>
    
          {/* Add Airline Form */}
          <div className="form-container">
            <input
              type="text"
              placeholder="Airline Name"
              value={newAirline.name}
              onChange={e => setNewAirline({ ...newAirline, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Country"
              value={newAirline.country}
              onChange={e => setNewAirline({ ...newAirline, country: e.target.value })}
            />
            <button onClick={addAirline}>Add Airline</button>
          </div>
    
          {/* Airlines Table */}
          <TableComponent
            headers={["ID", "Name", "Country", "Actions"]}
            data={airlines.map(airline => [
              airline.id,
              editingAirline && editingAirline.id === airline.id ? (
                <input
                  type="text"
                  value={editingAirline.name}
                  onChange={e => setEditingAirline({ ...editingAirline, name: e.target.value })}
                />
              ) : (
                airline.name
              ),
              editingAirline && editingAirline.id === airline.id ? (
                <input
                  type="text"
                  value={editingAirline.country}
                  onChange={e => setEditingAirline({ ...editingAirline, country: e.target.value })}
                />
              ) : (
                airline.country
              ),
              <>
                {editingAirline && editingAirline.id === airline.id ? (
                  <button onClick={() => updateAirline(airline.id)}>Save</button>
                ) : (
                  <button onClick={() => setEditingAirline(airline)}>Edit</button>
                )}
                <button onClick={() => deleteAirline(airline.id)}>Delete</button>
              </>
            ])}
          />
        </div>
      );
    }
    
    export default AirlinesPage;
