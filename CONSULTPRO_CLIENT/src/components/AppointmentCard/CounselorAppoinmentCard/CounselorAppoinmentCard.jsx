import React from "react";
import "./CounselorAppointmentCardStyles.scss";
import { useNavigate } from "react-router-dom";

const CounselorAppointmentCard = ({ appointment }) => {
  const navigate = useNavigate();

  const handleJoinSession = () => {
    navigate("/meeting-page");
  };

  return (
    <div className="counselor-appointment-card" key={appointment.id}>
      <div className="profile-img">
        <img src={appointment.clientImg} alt={appointment.clientName} />
      </div>
      <div className="details">
        <h4 className="client-name">{appointment.clientName}</h4>
        <p className="appointment-date">Date: {appointment.date}</p>
        <p className="appointment-time">Time: {appointment.time}</p>
        <div className="join-section">
          {appointment.status === "Today" && (
            <button onClick={handleJoinSession}>Join Session</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounselorAppointmentCard;