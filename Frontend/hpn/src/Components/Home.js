import React from "react";
import Navbar from "./Navbar";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/car-pool-img.png";
import { FiArrowRight } from "react-icons/fi";
import RideSearch from "./RideSearch"; // ✅ Fixed Import

const Home = () => {
  return (
    <div className="home-container" >

      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="Banner Background" />
        </div>

        <div className="home-text-section"  >
          <h1 className="primary-heading">
            Best Place For Starting Your Carpooling Journey
          </h1>
          <p className="primary-text">
            Explore the Rides with us and have a great experience
          </p>
          <button className="secondary-button" style={{width:"200px"}}>
            Find a Ride  <FiArrowRight />
          </button>

          {/* Ride Search Section */}
          <div style={{width:"900px"}}>
          <RideSearch />
         </div>
        </div>
      

        <div className="home-image-container">
          <img src={BannerImage} alt="Carpooling Image" />
        </div>
      </div>
    </div>
  );
};

export default Home; // ✅ Added Export
