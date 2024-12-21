import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddCounselorStyles.scss";

const AddCounselor = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [contact, setContact] = useState("");
  const [role] = useState("CONSULTANT"); // Predefined role as CONSULTANT
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const consultantData = {
      firstName,
      lastName,
      username,
      password,
      specialization,
      contact,
      role,
    };

    // Post the data to your API
    axios
      .post("http://localhost:8080/api/users/create-user", consultantData)
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("Email already registered! Please login.");
          navigate("/login");
        } else {
          alert(
            "Registered successfully! You'll receive confirmation after admin approval."
          );
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  const [isPsychiatrist, setIsPsychiatrist] = useState(false);

  const handlePsychiatristChange = (event) => {
    setIsPsychiatrist(event.target.value === "yes");
  };
  return (
    <><div className="add-counselor-container">
      <div className="registration-form">
        <h2>Add Counseller</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              id="firstName"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              id="lastName"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" placeholder="Enter Age" id="age" required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea placeholder="Enter Address" id="address" required />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" placeholder="Enter City" id="city" required />
          </div>
          <div className="form-group">
            <label htmlFor="district">District</label>
            <input
              type="text"
              placeholder="Enter District"
              id="district"
              required />
          </div>
          <div className="form-group">
            <label>Are you a psychiatrist?</label>
            <div className="psychiatrist">
              <label htmlFor="yes">Yes</label>
              <input
                type="radio"
                id="yes"
                name="psychiatrist"
                value="yes"
                onChange={handlePsychiatristChange} />
              <label htmlFor="no">No</label>
              <input
                type="radio"
                id="no"
                name="psychiatrist"
                value="no"
                onChange={handlePsychiatristChange} />
            </div>
          </div>
          {isPsychiatrist && (
            <div className="form-group">
              <label htmlFor="medicalQualification">
                Medical Qualification
              </label>
              <input type="file" id="medicalQualification" required />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="profile-img">Profile Image</label>
            <input type="file" id="profile-img" required />
          </div>

          <div className="form-group">
            <label htmlFor="nic">NIC File</label>
            <input type="file" id="nic" required />
          </div>
          <div className="form-group">
            <label htmlFor="degreeTranscript">Degree Transcript</label>
            <input type="file" id="degreeTranscript" required />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Working Experience</label>
            <textarea
              placeholder="Describe Experience"
              id="experience"
              required />
          </div>
          <div className="form-group">
            <label htmlFor="signature">Signature</label>
            <input type="file" id="signature" required />
          </div>

          <button type="submit" className="btn-primary">
            Add Counselor
          </button>
        </form>

        <div className="login-container">
          <Link to="/login" className="btn-secondary">
            Already Registered? Login
          </Link>
        </div>
      </div>
    </div><Footer /></>
  );
};

export default AddCounselor;
