import { useState } from "react";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import '../Components/css/RideSearch.css';
import { useNavigate, useLocation } from 'react-router-dom';

const RideSearch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve search data if coming back from DisplayRide
  const initialSearchData = location.state || {
    source: "",
    destination: "",
    date: new Date().toISOString().split("T")[0],
    passengers: 1,
  };

  const [source, setSource] = useState(initialSearchData.source);
  const [destination, setDestination] = useState(initialSearchData.destination);
  const [date, setDate] = useState(initialSearchData.date);
  const [passengers, setPassengers] = useState(initialSearchData.passengers);

  const handleSearchClick = () => {
    navigate('/display-ride', {
      state: { source, destination, date, passengers }
    });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-12">
          <div className="d-flex justify-content-between align-items-center">
            
            {/* Departure Input */}
            <div className="input-group">
              <span className="input-group-text" >
                <FaMapMarkerAlt />
                <input
                  type="text"
                  id="source"
                  placeholder="Leaving From"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="form-control border-0 shadow-none"
                  style={{color:"black"}}
                />
              </span>
            </div>

            {/* Destination Input */}
            <div className="input-group">
              <span className="input-group-text">
                <FaMapMarkerAlt />
                <input
                  type="text"
                  id="destination"
                  placeholder="Going To"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="form-control border-0 shadow-none"
                  style={{color:"black"}}
                />
              </span>
            </div>

            {/* Date Picker */}
            <div className="input-group">
              <span className="input-group-text">
                <FaCalendarAlt />
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="form-control border-0 shadow-none"
               
                />
              </span>
            </div>

            {/* Passengers Dropdown */}
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
                <select
                  id="passengers"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="form-control border-0"
                >
                  {[...Array(5).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1} passenger{num > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </span>
            </div>

            {/* Search Button */}
            <button className="btn btn-orange rounded-pill" onClick={handleSearchClick} style={{height:"80px"}} >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideSearch;
