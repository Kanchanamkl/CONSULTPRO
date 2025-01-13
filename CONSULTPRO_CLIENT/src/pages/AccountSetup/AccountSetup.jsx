import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AccountSetUpStyles.scss";

const AccountSetUp = ({ token }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email = token?.email || "d"; // Safely access the email property
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/users/approve-counselor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            status: "active",
          }),
        }
      );

      if (response.ok) {
        alert("Registration successful");
        navigate("/login"); // Navigate to the login page
      } else {
        alert("Registration failed");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="account-setup">
      <form className="account-setup-form">
        <h2>Account Setup</h2>
        <div className="form-group">
          <label htmlFor="username">Username (Email)</label>
          <input type="text" id="username" value={email} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Re-enter Password</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default AccountSetUp;
