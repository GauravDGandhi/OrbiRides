import React from 'react';
import Logo from "../Assets/Orbi.png";
import {BsTwitter} from "react-icons/bs";
import {FaFacebookF} from "react-icons/fa";
import {SiLinkedin} from "react-icons/si";
import {BsYoutube} from "react-icons/bs";


const Footer = () => {
  return (
    <div className="footer-wrapper" >
        <div className="footer-section-one">
            <div className="footer-logo-container">
                <img src={Logo} alt="Logo" />
            </div> 
            <div className="footer-icons">
                <BsTwitter />
                <SiLinkedin />
                <BsYoutube />
                <FaFacebookF />
            </div>
            </div>    

                
        <div className="footer-section-two">  
            <div className="footer-section-columns">

                <span>Help</span>    
                <span>Share</span>
                <span>Donate</span>
                <span>Feedback</span>
                <span >Work</span>


            </div>
            <div className="footer-section-columns">
                <span>63563112871</span>
                <span>orbirides@gmail.com</span>
                <span>contact@gmail.com</span>

             </div>
             <div className="footer-section-columns">
                <span>Privacy Policy</span>
                <span>Terms and Conditions</span>
                <span>Cookie Policy</span>
                <span>Accessibility</span>
                <span>AdChoices</span>
                <span>Blog</span>
             </div>   
        </div>
      
    </div>
  )
}

export default Footer

