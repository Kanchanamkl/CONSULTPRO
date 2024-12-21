import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaUserMd, FaUserCircle } from "react-icons/fa";

import {
  FaAddressBook,
  FaShoppingCart,
  FaCartArrowDown,
  FaUser,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { StoreContext } from "../../StoreContext/StoreContext";
import {
  MdAssignmentAdd,
  MdLogout,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./SideBarStyles.scss";

const SideBar = () => {
  const { isLoggedIn, handleLogout, firstName, role, username } =
    useContext(StoreContext);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const [showProfileCard, setShowProfileCard] = useState(false);

  const toggleProfileCard = () => {
    setShowProfileCard((prevState) => !prevState);
  };

  const navigate = useNavigate();

  const confirmLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    });

    if (result.isConfirmed) {
      handleLogout();
    }
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="dash-board-navbar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} />
          </Link>
          <div className="nav-bar-right">
            {role === "CLIENT" && (
              <button
                onClick={() => navigate("/consultants")}
                className="nav-item-new-apointment"
              >
                <Link to="/consultants">
                  <MdAssignmentAdd />
                </Link>
                <span>New Appointment</span>
              </button>
            )}

            <li className="nav-item">
              <Link onClick={toggleProfileCard}>
                <FaUser />
              </Link>
            </li>
          </div>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul onClick={showSidebar} className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiOutlineClose />
              </Link>
            </li>

            {isLoggedIn && (
              <>
                <li className="side-item">
                  <Link to="/dashboard">
                    <FaHome />
                    <span> Dashboard </span>
                  </Link>
                </li>
                <li className="side-item">
                  <Link to="/appointments">
                    <FaAddressBook />
                    <span> Appointments </span>
                  </Link>
                </li>
                {(role === "CLIENT" || role === "COUNSELOR") && (
                  <li className="side-item">
                    <Link to="/profile">
                      <FaUserCircle />
                      <span> Profile </span>
                    </Link>
                  </li>
                )}
                {role === "ADMIN" && (
                  <>
                    <li className="side-item">
                      <Link to="/applications">
                        <MdOutlinePendingActions />
                        <span> Approvals </span>
                      </Link>
                    </li>
                    <li className="side-item">
                      <Link to="/add-counselor">
                        <FaUserMd />
                        <span> Add Counselor </span>
                      </Link>
                    </li>
                  </>
                )}
              </>
            )}

            {isLoggedIn ? (
              <button onClick={confirmLogout} className="login-out-btn">
                <span>
                  <MdLogout />
                </span>
              </button>
            ) : (
              <li className="side-item">
                <Link to="/login">
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
