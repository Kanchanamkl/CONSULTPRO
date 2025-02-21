import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isExpired, decodeToken } from "react-jwt";
import "./AccountSetUpStyles.scss";

const AccountSetUp = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      const expired = isExpired(token);
      if (expired) {
        alert("Sign-up link has expired!");
      } else {
        const decodedToken = decodeToken(token);
        setEmail(decodedToken.email || "d");
        console.log("Decoded Token Data:", decodedToken);
      }
    } else {
      alert("Invalid sign-up link");
    }
  }, [location.search]);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/api/users/account-setup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      if (response.ok) {
        alert("Registration successful");
        navigate("/login");
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
          <label htmlFor="username">Email</label>
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
