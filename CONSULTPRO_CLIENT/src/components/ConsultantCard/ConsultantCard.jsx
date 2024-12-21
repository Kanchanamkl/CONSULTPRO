import React, { useContext } from "react";
import "./ConsultantCardStyles.scss"; // Add styles for the ConsultantCard component
import { MdAssignmentAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";


const ConsultantCard = ({ consultant }) => {
  const navigate = useNavigate();
  const { updateSelectedConsultant } = useContext(StoreContext); 

  const handleNavigate = () => {
    updateSelectedConsultant(consultant);
    navigate('/book');
  };
  return (
    <div className="consultn-card">
      <img
        src={consultant.counselor_img}
        alt={consultant.name}
        className="consultn-img"
      />
      <h3 className="consultn-name">{consultant.name}</h3>
      <p className="consultn-specialize">{consultant.specialize}</p>
      <button className="appointment-button" onClick={handleNavigate}>
      <MdAssignmentAdd className="appointment-icon" /> {/* Add the icon here */}
        Make an Appointment</button>
    </div>
  );
};

export default ConsultantCard;
