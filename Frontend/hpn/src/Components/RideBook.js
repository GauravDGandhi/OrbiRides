import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import driverImage from '../Assets/img.jpg';
import {
  faPhone,
  faMapMarkerAlt,
  faCar,
  faUser,
  faClock,
  faRupeeSign,
  faStar,
  faIdCard,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./css/RideBook.css";

function RideBook() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve passenger count from state or set default to 1
  const numPassengers = location.state?.numPassengers || 1;
  const price = location.state?.price;
  const date = location.state?.date;
  const driver = location.state?.driver;
  const source = location.state?.source;
  const destination = location.state?.destination;
  const tripId = location.state?.tripId;
  console.log("rideBook" + tripId);
  
  console.log(destination);
  const pricePerPassenger = price; // Base price per passenger
  const totalPrice = pricePerPassenger * numPassengers;

  const [showModal, setShowModal] = useState(false); 

  const [ride] = useState({
    driver: {
      name: driver,
      image: driverImage,
      rating: 4.5,
      car: "KIA CARENS - White",
      license: "MH 12 AB 1234",
      experience: "5 Years",
      contact: "+91 9876543210",
    },
    route: {
      date: date,
      pickup: {
        time: "02:00 PM",
        location: source,
        address: "",
      },
      dropoff: {
        time: "08:50 PM",
        location: destination,
        address: "",
      },
    },
    passengers: Array.from({ length: numPassengers }, (_, i) => ({
      name: `Passenger ${i + 1}`,
      route: `${source} → ${destination} `,
    })),
    price: totalPrice.toLocaleString("en-IN", { style: "currency", currency: "INR" }),
  });

  const handleBookClick = () => {
    const isAuthenticated = localStorage.getItem("isLoggedIn")
    if (isAuthenticated) {
      navigate("/payment",{
        state: { seatsBooked : numPassengers,tripId : tripId, bookingTime: date }
      }); // Redirect to payment page
    } else {
      navigate("/login"); // Redirect to login page
    }
  };
  

  return (
    <div style={{ backgroundColor: "#ffc966", padding: "20px" }}>
      <div className="ride-book-container">
        {/* Driver & Route Details */}
        <div className="top-section">
          {/* Driver Details */}
          <div className="card driver-card">
            <div className="driver-image-container">
              <img src={ride.driver.image} alt={ride.driver.name} className="driver-image" />
            </div>
            <div className="driver-info">
              <h3 className="driver-name">{ride.driver.name}</h3>
              <p className="driver-rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" /> {ride.driver.rating} (Excellent)
              </p>
              <p><FontAwesomeIcon icon={faCar} className="icon" /> {ride.driver.car}</p>
              <p><FontAwesomeIcon icon={faIdCard} className="icon" /> {ride.driver.license}</p>
              <p><FontAwesomeIcon icon={faUser} className="icon" /> {ride.driver.experience}</p>
              
              <button className="contact-btn" onClick={() => setShowModal(true)}>
                <FontAwesomeIcon icon={faPhone} /> Contact {driver}
              </button>
            </div>
          </div>

          {/* Route Details */}
          <div className="card route-card" >
            <h2>{ride.route.date}</h2>
            <div className="route-map">
              <div className="route-section">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="route-icon" />
                <div>
                  <p><FontAwesomeIcon icon={faClock} /> {ride.route.pickup.time}</p>
                  <h3>{ride.route.pickup.location}</h3>
                  <p>{ride.route.pickup.address}</p>
                </div>
              </div>
              <div className="route-section">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="route-icon" />
                <div>
                  <p><FontAwesomeIcon icon={faClock} /> {ride.route.dropoff.time}</p>
                  <h3>{ride.route.dropoff.location}</h3>
                  <p>{ride.route.dropoff.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Passengers & Price Section */}
        <div className="bottom-section">
          <div className="card passengers-card">
            <h2>Passengers</h2>
            <ul>
              {ride.passengers.map((passenger, index) => (
                <li key={index}>
                  <FontAwesomeIcon icon={faUser} /> {passenger.name} - {passenger.route}
                </li>
              ))}
            </ul>
          </div>

          <div className="card price-card">
  <h2 className="price-title">Price Breakdown</h2>

  {/* Price per Passenger */}
  <div className="price-detail">
    <span>Price per Passenger:</span>
    <span>
      <FontAwesomeIcon icon={faRupeeSign} /> {pricePerPassenger}
    </span>
  </div>

  {/* Total Price */}
  <div className="price-detail total-price">
    <span>Total Price ({numPassengers} Passenger{numPassengers > 1 ? "s" : ""}):</span>
    <span>
      <FontAwesomeIcon icon={faRupeeSign} /> {totalPrice}
    </span>
  </div>
</div>


        </div>

        {/* Book Ride Button */}
        <button className="book-btn" onClick={handleBookClick}>Book Ride</button>

        {/* Contact Modal Popup */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h2>Contact Driver</h2>
              <p><FontAwesomeIcon icon={faPhone} /> {ride.driver.contact}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RideBook;
