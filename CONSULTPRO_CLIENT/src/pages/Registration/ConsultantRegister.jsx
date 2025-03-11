import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ConsultantRegisterStyles.scss";
import { ToastContainer, toast } from "react-toastify";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../config/firebaseConfig";
import { GiConsoleController } from "react-icons/gi";

const ConsultantRegister = () => {
  const [loading, setLoading] = useState(false);
  const [role] = useState("CONSULTANT");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    specialization: "",
    contact: "",
    role: "COUNSELOR",
    gender: "",
    address: "",
    city: "",
    district: "",
    dob: "",
    isPsychiatrist: false,
    profilePic: null,
    nic: null,
    degreeTranscript: null,
    medicalQualification: null,
    experienceDescription: "",
    signature: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleFileUpload = async (file) => {
    const storageRef = ref(
      imageDb,
      `ConsultPro_File_Storage/Counselor_Files/${formData.username}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("submitting form data", formData);

    try {
      const profilePicUrl = await handleFileUpload(formData.profilePic);
      const nicUrl = await handleFileUpload(formData.nic);
      const degreeTranscriptUrl = await handleFileUpload(
        formData.degreeTranscript
      );
      const medicalQualificationUrl = isPsychiatrist
        ? await handleFileUpload(formData.medicalQualification)
        : null;
      const signatureUrl = await handleFileUpload(formData.signature);

      const consultantData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        password: formData.password,
        specialization: formData.specialization,
        contact: formData.contact,
        role: formData.role,
        age: formData.age,
        isPsychiatrist: formData.isPsychiatrist,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        dob: formData.dob,
        profilePic: profilePicUrl,
        nic: nicUrl,
        degreeTranscript: degreeTranscriptUrl,
        medicalQualification: medicalQualificationUrl,
        experienceDescription: formData.experienceDescription,
        signature: signatureUrl,
        isPsychologist: isPsychiatrist,
      };

      axios
        .post("http://142.93.215.196:8001/api//users/create-user", consultantData)
        .then((result) => {
          console.log(result);
          if (result.data === "Already registered") {
            alert("Email already registered! Please login.");
            navigate("/login");
          } else {
            if (result.status === 200) {
              toast.success("Registration Successful");
              setTimeout(function () {
                window.location.replace("/");
              }, 1300);
            }
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log("Registration failed", error);
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const [isPsychiatrist, setIsPsychiatrist] = useState(false);

  const handlePsychiatristChange = (event) => {
    setIsPsychiatrist(event.target.value === "yes");
  };
  return (
    <div className="registration-container">
      {loading ? (
        <div className="loading-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="registration-form">
          <h2>Counselor Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                placeholder="Enter First Name"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                placeholder="Enter Last Name"
                name="lastName"
                required
                onChange={handleChange}
                value={formData.lastName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="username"
                required
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="gender">
                <label htmlFor="male">Male</label>
                <input
                  type="radio"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
                <label htmlFor="other">Other</label>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                name="address"
                value={formData.address}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                name="city"
                value={formData.city}
                required
                onChange={handleChange}
                id="city"
              />
            </div>
            <div className="form-group">
              <label>Are you a psychiatrist?</label>
              <div className="psychiatrist">
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  id="yes"
                  name="psychiatrist"
                  value={formData.isPsychiatrist}
                  onChange={handlePsychiatristChange}
                />
                <label htmlFor="no">No</label>
                <input
                  type="radio"
                  id="no"
                  name="psychiatrist"
                  value={formData.isPsychiatrist}
                  onChange={handlePsychiatristChange}
                />
              </div>
            </div>
            {isPsychiatrist && (
              <div className="form-group">
                <label htmlFor="medicalQualification">
                  Medical Qualification
                </label>
                <input
                  type="file"
                  id="medicalQualification"
                  onChange={handleChange}
                  required
                  name="medicalQualification"
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="profile-img">Profile Image</label>
              <input
                type="file"
                id="profile-img"
                onChange={handleChange}
                name="profilePic"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nic">NIC File</label>
              <input
                type="file"
                id="nic"
                onChange={handleChange}
                required
                name="nic"
              />
            </div>
            <div className="form-group">
              <label htmlFor="degreeTranscript">Degree Transcript</label>
              <input
                type="file"
                id="degreeTranscript"
                onChange={handleChange}
                name="degreeTranscript"
                required
              />
              <textarea
                placeholder="Describe Experience"
                name="experienceDescription"
                id="experience"
                value={formData.experienceDescription}
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signature">Signature</label>
              <input
                name="signature"
                type="file"
                id="signature"
                onChange={handleChange}
                required
              />
            </div>

            <div className="info-text">
              After submitting this form, you'll receive a confirmation email
              once your profile is reviewed and approved.
            </div>

            <button type="submit" className="btn-primary">
              Submit Application
            </button>
          </form>

          <div className="login-container">
            <Link to="/login" className="btn-secondary">
              Already Registered? Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantRegister;
