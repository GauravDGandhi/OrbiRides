import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import "./css/RecentRides.css";

const RecentRides = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  // Fetch rides from API
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/rides/fetchrides?userId=${userId}`);
        setRides(response.data); // Assuming API returns an array of rides
        console.log(response.data);//changed
      } catch (err) {
        setError("Failed to load rides. Please try again.");
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  // Function to delete a ride
  const handleDelete = (id) => {
    setRides(rides.filter((ride) => ride.id !== id));
  };

  return (
    <div className="card shadow-lg p-4 recent-rides-container">
      <h2 className="text-center mb-3">Booked Rides</h2>

      {loading ? (
        <p className="text-center text-muted">Loading rides...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : rides.length > 0 ? (
        <ul className="list-group">
          {rides.map((ride) => (
            <li key={ride.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{`Ride: ${ride.source} to ${ride.destination} - ₹${ride.price}`}</span>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ride.id)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-muted">No Booked rides found.</p>
      )}
    </div>
  );
};

export default RecentRides;
