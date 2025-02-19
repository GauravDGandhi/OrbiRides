import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/Profile.css";
import profileImage from "../Assets/img.jpg";
import axios from "axios";
function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {}; // Get passed user data

  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone || "");
  const [photo, setPhoto] = useState(userData.profilePic || profileImage);
  const userId = localStorage.getItem("userId");

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const fetchRides = async () => {
      try {
        const response = await axios.put(`http://localhost:8080/api/users/update?userId=${userId}`,{name,email,phone});
        console.log(response.data);//changed
      } catch (err) {
        //setError("Failed to load rides. Please try again.");
        //console.error("Error fetching rides:", err);
      } finally {
        //setLoading(false);
      }

    }
    console.log({ name, email, phone, photo });
    navigate("/profile"); // Redirect after saving
  };

  return (
    <div className="card shadow-lg p-4 profile-container">
      <h2 className="text-center">Edit Profile</h2>
      <form onSubmit={handleSave}>
        <div className="text-center">
          <img
            src={photo || profileImage}
            alt="Profile"
            className="rounded-circle profile-pic"
            width="100"
          />
          <input type="file" accept="image/*" className="form-control mt-2" onChange={handlePhotoChange} />
        </div>

        <div className="mt-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mt-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mt-3">
          <label className="form-label">Phone</label>
          <input type="tel" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-success mt-4 w-100">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
