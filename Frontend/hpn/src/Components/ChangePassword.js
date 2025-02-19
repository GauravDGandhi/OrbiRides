import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaKey } from "react-icons/fa";
import "./css/ChangePassword.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password changed successfully!");
    navigate("/profile");
  };

  return (
    <div className="change-password-container">
      <div className="card shadow-lg p-4">
        <h2 className="text-center">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <FaLock /> Current Password
            </label>
            <input
              type="password"
              className="form-control"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <FaKey /> New Password
            </label>
            <input
              type="password"
              className="form-control"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <FaKey /> Confirm New Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
