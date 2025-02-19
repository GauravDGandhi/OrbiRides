import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";  // Import axios
import { FaClock, FaMapMarkerAlt, FaUser, FaDollarSign } from 'react-icons/fa';
import RideSearch from "./RideSearch";
import '../Components/css/DisplayRide.css';

const DisplayRide = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve search data from RideSearch
  const { source, destination, date, passengers } = location.state || {};

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/trips/search?source=${source}&destination=${destination}`
        // , {
          // params: { source, destination},
        //}
      );
        setRides(response.data);
      } catch (err) {
        setError("Failed to fetch rides. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [source, destination]);

  // Function to navigate to BookRide with passenger count
  const handleRideClick = (ride) => {
    console.log("tripid" + ride.tripId);
    navigate('/book-ride', { state: { numPassengers: passengers , price : ride.price , date : ride.departureTime , driver : ride.driverName , source : ride.source , destination : ride.destination,tripId : ride.id } });
  };

  return (
    <div className="home-container" style={{ backgroundColor: "#ffc966" }}>
      <div className="home-banner-container">
        <div className="ride-search-container">
          <RideSearch />
        </div>
        <div className="ride-details-container">
          <h1>Ride Details</h1>

          {loading ? (
            <p>Loading rides...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : rides.length === 0 ? (
            <p>No rides available for the selected route.</p>
          ) : (
            <ul className="rides-list">
              {rides.map((ride) => (
                <li key={ride.id} className="ride-item" onClick={() => handleRideClick(ride)}>
                  <h2>
                    <FaMapMarkerAlt className="icon" />
                    {ride.source} → {ride.destination}
                  </h2>
                  <div className="ride-info">
                    <div><FaClock className="icon" /> Departure: 10:00 AM</div>
                    <div><FaClock className="icon" /> Date: {ride.departureTime}</div>
                    {/* <div>Duration: {ride.duration}</div> */}
                    <div className="price-info"><FaDollarSign className="icon" /> Price: {ride.price}</div>
                  </div>
                  <div className="driver-info">
                    <FaUser className="icon" /> Driver: {ride.driverName}
                    {ride.isInstantBooking && <span className="instant-booking">Instant Booking</span>}
                  </div>
                  <button className="ride-alert-btn">Create a ride alert</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayRide;