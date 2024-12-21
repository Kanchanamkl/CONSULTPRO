// src/components/RecentAppointments.jsx
import React, { useState, useEffect } from "react";
import "./ClientAppointmentCardStyles.scss";
import { useNavigate } from "react-router-dom";
const AppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();

  const handleNavidate = () => {
    navigate("/meeting-page");
  };

  return (
    <div className="appointments-container">
      <div className="client-appointment-card" key={appointment.id}>
        <div className="profile-img">
          <img
            src={appointment.consultantImg}
            alt={appointment.consultantName}
          />
        </div>
        <div className="details">
          <h4 className="consultant-name">{appointment.consultantName}</h4>
          <p className="appointment-date">Date : {appointment.date}</p>
          <p className="appointment-time">Time : {appointment.time}</p>
          <div className="join-section">
            {appointment.status !== "Today" && (
              <p
                className={`appointment-status ${
                  appointment.status === "Upcoming"
                    ? "status-upcoming"
                    : appointment.status === "Completed"
                    ? "status-completed"
                    : ""
                }`}
              >
                {appointment.status}
              </p>
            )}
            {appointment.status === "Today" && (
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