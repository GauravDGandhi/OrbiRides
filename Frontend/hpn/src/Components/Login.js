import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Components/css/Login.css";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`http://localhost:8080/api/users/login?email=${email}&password=${password}`
      // , {
      //   email,
      //   password,
      // }
    );

      if (response.status === 200) {
        // Store login status in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail",response.data.email);
        localStorage.setItem("userName",response.data.name);
        localStorage.setItem("userId",response.data.id);
        console.log(response.data);
        setMessage("✅ Login Successful!");
  
        setTimeout(() => navigate("/display-ride"), 1000)
       // window.location.reload(); // Redirect after login
      } else {
        setMessage("❌ Invalid credentials. Try again.");
      }
    } catch (error) {
      setMessage("❌ Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <div className="form-box login">
          <form onSubmit={handleLogin}>
            <h1>Login</h1>
            {message && <p className="message">{message}</p>}
            <div className="input-box">
              <MdEmail className="icon" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ marginLeft: "-130px", width: "300px", marginTop: "-1px" }}
              />
            </div>
            <div className="input-box">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ marginLeft: "-130px", width: "300px", marginTop: "-1px" }}
              />
            </div>
            <button type="submit" style={{ marginLeft: "1px" }}>Login</button>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <button type="button" className="link-btn" onClick={() => navigate("/register")} style={{ marginLeft: "5px", width: "320px" }}>
                  Register now
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;