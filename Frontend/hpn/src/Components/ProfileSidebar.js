import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaHistory, FaSignOutAlt,FaKey } from "react-icons/fa";
import profileImage from "../Assets/img.jpg";
import './css/ProfileSidebar.css'
const ProfileSidebar = () => {
  const userName = localStorage.getItem("userName");
  return (
    <div className="bg-dark text-white vh-100 p-3">
      <div className="text-center mb-3">
        <img src={profileImage} alt="Profile Icon" className="rounded-circle" width="80" height="80" />
        <h5 className="mt-2">{userName}</h5>
      </div>
      <ul className="list-unstyled">
      
        <li><Link to="recent" className="btn  w-100 mb-2"><FaHistory /> Booked Rides</Link></li>
        <li>
          <Link to="change" className="btn w-100 mb-2">
            <FaKey /> Change Password
          </Link>
        </li>
        {/* <li><a href="#" className="btn btn-danger w-100"><FaSignOutAlt /> Sign Out</a></li> */}
      </ul>
    </div>
  );
};

export default ProfileSidebar;
