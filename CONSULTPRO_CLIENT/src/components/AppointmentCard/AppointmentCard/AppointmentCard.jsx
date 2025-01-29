// src/components/RecentAppointments.jsx
import React, { useState, useEffect } from "react";
import "./AppointmentCardStyles.scss";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../StoreContext/StoreContext";
import { useContext } from "react";
const AppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();
  const { role } = useContext(StoreContext);
  const userRole = role;
  const handleNavidate = () => {
    navigate("/meeting-page");
  };

  return (
    <div className="appointments-container">
      <div className="client-appointment-card" key={appointment.id}>
        <div className="profile-img">
          <img
            src={appointment.counselorImg}
            alt={appointment.consultantName}
          />
        </div>
        <div className="details">
          <h4 className="consultant-name">{appointment.counselorName}</h4>
          <p className="appointment-date">Date : {appointment.date}</p>
          <p className="appointment-time">Time : {appointment.time}</p>
          <div className="join-section">
            {appointment.status !== "TODAY" && (
              <p
                className={`appointment-status ${
                  appointment.status === "UPCOMING"
                    ? "status-UPCOMING"
                    : appointment.status === "COMPLETED"
                    ? "status-COMPLETED"
                    : ""
                }`}
              >
                {appointment.status}
              </p>
            )}
            {appointment.status === "TODAY" && (
              <>
                <div>
                  <button
                    className={`join-button`}
                    onClick={() => handleNavidate()}
                  >
                    Join Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;