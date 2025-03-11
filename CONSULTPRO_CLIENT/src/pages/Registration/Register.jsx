import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { imageDb } from "../../config/firebaseConfig"; // Adjust the import path as needed
import "./ConsultantRegisterStyles.scss";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleFileUpload = async (file) => {
    const storageRef = ref(
      imageDb,
      `ConsultPro_File_Storage/User_Profile_Pics/${username}/${file.name}`
    );
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let profilePicUrl = "";
    if (profilePic) {
      profilePicUrl = await handleFileUpload(profilePic);
    }

    const userData = new FormData();
    userData.append("firstName", firstName);
    userData.append("lastName", lastName);
    userData.append("username", username);
    userData.append("password", password);
    userData.append("role", role);
    userData.append("gender", gender);
    userData.append("dob", dob);
    userData.append("profilePic", profilePicUrl);
    userData.append("phoneNumber", phoneNumber);
    userData.append("country", country);

    console.log("Sending payload:", userData);
    axios
      .post("http://142.93.215.196:8001/api//users/create-user", userData)
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="registration-container">
      <div className="registration-form">
        <h2 className="mb-3 text-primary">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="form-control"
              id="firstName"
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="form-control"
              id="lastName"
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              className="form-control"
              id="gender"
              onChange={(event) => setGender(event.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dob"
              onChange={(event) => setDob(event.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePic" className="form-label">
              Profile Image
            </label>
            <input
              type="file"
              className="form-control"
              id="profilePic"
              onChange={(event) => setProfilePic(event.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="form-control"
              id="phoneNumber"
              onChange={(event) => setPhoneNumber(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Register
          </button>
        </form>

        <p className="container my-2">Already have an account?</p>

        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
