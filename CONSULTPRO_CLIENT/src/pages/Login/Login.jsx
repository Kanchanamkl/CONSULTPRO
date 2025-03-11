import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";
import { GiConsoleController } from "react-icons/gi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    setIsLoggedIn,
    setUserId,
    setCounselorId,
    setFirstName,
    setRole,
    setUsername,
    setLastName,
    setProfilePic,
  } = useContext(StoreContext);
  const demoUsers = [
    {
      username: "client@gmail.com",
      password: "client@123",
      role: "CLIENT",
      firstName: "ClientFirstName",
      lastName: "ClientLastName",
    },
    {
      username: "counselor@gmail.com",
      password: "counselor@123",
      role: "COUNSELOR",
      firstName: "CounselorFirstName",
      lastName: "CounselorLastName",
    },
    {
      username: "admin@gmail.com",
      password: "admin@123",
      role: "ADMIN",
      firstName: "AdminFirstName",
      lastName: "AdminLastName",
    },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://142.93.215.196:8001/api//users/authenticate",
        {
          email: email,
          password: password,
        }
      );

      console.log("login-res", response);

      if (response.status === 200) {
        if (response.data.userStatus === "INACTIVE") {
          alert("Your account is Inactive. Please contact support.");
          return;
        }
        

        const role = response.data.role;
        const firstName = response.data.firstName;
        const lastName = response.data.lastName;
        const username = response.data.username;

        console.log("First Name:", firstName);
        console.log("Last Name:", lastName);
        console.log("Role:", role);
        console.log("username", username);
        console.log("profile-pic", response.data.profilePic);

        setUserId(response.data.id);
        if (response.data.counselorId) {
          setCounselorId(response.data.counselorId);
        }
        setFirstName(firstName);
        setLastName(lastName);
        setUsername(username);
        setRole(role);
        setProfilePic(response.data.profilePic);
        setIsLoggedIn(true);
        navigate("/");

        // const user = demoUsers.find(user => user.username === email && user.password === password);
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{ backgroundColor: "#D7E4FF" }}
      >
        <div
          className="bg-white p-3 rounded shadow"
          style={{
            width: "30vw",
            height: "65vh",
            borderRadius: "10px",
            marginTop: "55px",
          }}
        >
          <h2 className="mb-3 text-primary ">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
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
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>

          <p className="container my-2 mt-3">Don&apos;t have an account?</p>
          <button className="btn">
            <Link to="/register">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
