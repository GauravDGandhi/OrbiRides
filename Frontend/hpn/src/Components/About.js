import React, { useState } from 'react';
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/about-background-image.png";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="about-section-container" style={{ marginTop: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="about-background-image-container" style={{ marginBottom: '20px' }}>
        <img src={AboutBackground} alt="About Background" />
      </div>
      <div className="about-image-container" style={{ marginRight: '100px' }}>
        <img src={AboutBackgroundImage} alt="About Background Image" />
      </div>
      <div className="about-section-text-container" style={{ marginLeft: '20px', flex: 1 }}>
        <p className="primary-subheading"></p>
        <h1 className="primary-heading">Carpooling: Save Money & Protect the Environment.</h1>
        <p className="primary-text">
          Carpooling is an effective way to reduce travel costs, lower carbon emissions, and ease traffic congestion. 
          By sharing a ride with others, you contribute to a greener planet while also making commuting more affordable.
        </p>
        <p className="primary-text">
          Whether you're heading to work, school, or a trip, carpooling helps in fuel savings and reduces stress by minimizing the number of vehicles on the road.
          Join the movement today and make a positive impact!
        </p>
       
        </div>
      </div>

   
     
    
  );
}

export default About;
