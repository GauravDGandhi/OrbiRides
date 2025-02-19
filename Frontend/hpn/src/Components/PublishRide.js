import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/css/PublishRide.css";

const PublishRide = () => {
  const navigate = useNavigate();
  const [rideDetails, setRideDetails] = useState({
    pickup: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    price: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setRideDetails({ ...rideDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(rideDetails).some((value) => value === "")) {
      setMessage("❌ Please fill in all fields.");
      return;
    }
    setMessage("✅ Ride Published Successfully!");
    setTimeout(() => navigate("/rides"), 1500);
  };

  return (
    <div className="publish-ride-page">
      <h1 className="publish-ride-title" style={{marginLeft:"-600px"}}>Publish a Ride</h1> {/* Title at the Top */}
      <div className="wrapper" style={{marginLeft:"-600px"}}>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="pickup" placeholder="Pickup Location" onChange={handleChange} required />
          <input type="text" name="destination" placeholder="Destination" onChange={handleChange} required />
          <input type="date" name="date" onChange={handleChange} required />
          <input type="time" name="time" onChange={handleChange} required />
          <input type="number" name="seats" placeholder="Available Seats" onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price per Seat ($)" onChange={handleChange} required />
          <button type="submit">Publish Ride</button>
        </form>
      </div>
    </div>
  );
};

export default PublishRide;
