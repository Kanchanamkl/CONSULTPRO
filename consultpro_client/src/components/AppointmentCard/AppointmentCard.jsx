import React, { useState, useEffect } from "react";
import "./AppointmentCardStyles.scss";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";
import { useContext } from "react";

const AppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();
  const { role , setCurrentMeeting } = useContext(StoreContext);
  const userRole = role;
  const [isJoinButtonEnabled, setIsJoinButtonEnabled] = useState(false);

  useEffect(() => {
    const checkButtonStatus = () => {
      const now = new Date();
      const startTime = new Date(
        appointment.date + " " + appointment.startTime
      );
      const endTime = new Date(appointment.date + " " + appointment.endTime);

      // Enable button 5 minutes before start time
      const enableTime = new Date(startTime.getTime() - 5 * 60000);
      // Disable button 5 minutes after end time
      const disableTime = new Date(endTime.getTime() + 5 * 60000);

      // if (now >= enableTime && now <= disableTime) {
        setIsJoinButtonEnabled(true);
      // } else {
        // setIsJoinButtonEnabled(false);
      // }
    };

    checkButtonStatus();
    const interval = setInterval(checkButtonStatus, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [appointment]);

  const handleNavidate = () => {
    setCurrentMeeting(appointment);
    navigate("/meeting-page");
  };

  return (
    <div className="appointments-container">
      <div className="client-appointment-card" key={appointment.id}>
        <div className="profile-img">
          {userRole === "CLIENT" ? (
            <img
              src={appointment.counselorImg}
              alt={appointment.consultantName}
            />
          ) : userRole === "COUNSELOR" ? (
            <img src={appointment.clientImg} alt={appointment.clientName} />
          ) : null}
        </div>
        <div className="details">
          {userRole === "CLIENT" ? (
            <h4 className="consultant-name">{appointment.counselorName}</h4>
          ) : userRole === "COUNSELOR" ? (
            <h4 className="consultant-name">{appointment.clientName}</h4>
          ) : null}
          <p className="appointment-date">Date : {appointment.date}</p>
          <p className="appointment-time">Time : {appointment.timeSlot}</p>
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
                {!isJoinButtonEnabled && (
                  <div className="tooltip-container">
                    <button
                      className={`join-button`}
                      onClick={handleNavidate}
                      disabled={!isJoinButtonEnabled}
                    >
                      Join Now
                    </button>
                    <span className="tooltip-text">
                      * You will have access before 5 min
                    </span>
                  </div>
                )}
                {isJoinButtonEnabled && (
                  <div className="tooltip-container">
                    <button className={`join-button`} onClick={handleNavidate}>
                      Join Now
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
