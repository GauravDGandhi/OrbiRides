import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import axios from "axios";  
import profileImage from "../Assets/img.jpg";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profilePic: profileImage,
  });
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const email = localStorage.getItem("userEmail");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/profile?email=${email}`
          
        // , {
          // params: { source, destination},
        //}
      );
        console.log(response.data);
        
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch User Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  // useEffect(() => {
  //   setUser({
  //     name: "Burk Macklin",
  //     email: "burk.macklin@example.com",
  //     phone: "(123) 456-7890",
  //     profilePic: profileImage, // Correct image path
  //   });
  // }, []);

  return (
    <div className="card shadow-lg p-4 profile-container">
      <h2 className="text-center">Profile</h2>
      <div className="profile-content">
        <img
          src={profileImage}
          alt="Profile"
          className="profile-pic"
          width="120"
          height="120"
        />
        <h4 className="mt-3">{user.name}</h4>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
      </div>
      <button
        className="btn btn-primary mt-3 w-100"
        onClick={() => navigate("edit", { state: user })}
      >
        Edit Profile
      </button>
    </div>
  );
}

export default Profile;
