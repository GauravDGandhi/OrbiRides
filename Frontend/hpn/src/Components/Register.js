import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Components/css/Register.css";
import { FaUser, FaLock, FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", formData);
      if (response.status === 201 || response.status === 200) {
        setMessage("✅ Registration Successful!");
        setTimeout(() => navigate("/login"), 1500); // Redirect to login after success
      }
    } catch (error) {
      setMessage("❌ Registration Failed! Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-page">
      <div className="wrapper">
        <div className="form-box register">
          <form onSubmit={handleRegister}>
            <h1>Register</h1>
            {message && <p className="message">{message}</p>}
            <div className="input-box">
              <FaUser className="icon" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                value={formData.name}
                onChange={handleChange}
                style={{ marginLeft: "-130px", width: "300px", marginTop: "-1px" }}
              />
            </div>
            <div className="input-box">
              <MdEmail className="icon" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{ marginLeft: "-130px", width: "300px", marginTop: "-1px" }}
              />
            </div>
            <div className="input-box">
              <FaPhone className="icon" />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                required
                value={formData.phone}
                onChange={handleChange}
                style={{ marginLeft: "-130px", width: "300px", marginTop: "-1px" }}
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                style={{ marginLeft: "-130px", width: "300px", marginTop: "-1px" }}
              />
            </div>
            <button type="submit" style={{ marginLeft: "1px" }}>Register</button>
            <div className="login-link">
              <p>
                Already have an account?{" "}
                <button type="button" className="link-btn" onClick={() => navigate("/login")} style={{ marginLeft: "5px", width: "320px" }}>
                  Login
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;