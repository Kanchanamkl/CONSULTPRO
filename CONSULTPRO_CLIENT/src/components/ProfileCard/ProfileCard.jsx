import React,{useContext} from "react";
import "./ProfileCardStyles.scss";
import { IoCloseCircleOutline } from "react-icons/io5";
import { StoreContext } from "../../StoreContext/StoreContext";
import Swal from "sweetalert2"; 

import {
    MdLogout,
  } from "react-icons/md";

function UserProfileCard({ name, username, profile_icon, role, onClose }) {
      const {
        handleLogout,
      } = useContext(StoreContext);

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
    <div className="user-profile-card">
        <button className="close-button" onClick={onClose}>
            <IoCloseCircleOutline size={20} color="#000" />
        </button>
        <div className="profile-container">
            <div className="user-icon">
                <img src={profile_icon} alt="User" />
            </div>
            <div className="user-details">
                <p className="user-name">{name}</p>
                <p className="user-name">{username}</p>
                <p className="user-role">{role}</p>
                <button onClick={confirmLogout} className="logout-btn">
                <span>
                  <MdLogout /> Loguot
                </span>
              </button>               

            </div>
        </div>
    </div>
);
}

export default UserProfileCard;
