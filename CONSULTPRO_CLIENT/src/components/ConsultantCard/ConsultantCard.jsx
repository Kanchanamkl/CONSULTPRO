import React, { useContext } from "react";
import "./ConsultantCardStyles.scss"; // Add styles for the ConsultantCard component
import { MdAssignmentAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";

const ConsultantCard = ({ consultant }) => {
  const navigate = useNavigate();
  const { updateSelectedCounselor } = useContext(StoreContext);

  const handleNavigate = () => {
    updateSelectedCounselor(consultant);
    navigate("/book");
  };
  return (
    <div className="consultn-card">
      <img
        src={consultant.profilePic}
        alt={consultant.firstName}
        className="consultn-img"
      />
      <h3 className="consultn-name">{consultant.firstName}{consultant.lastName} </h3>
      <p className="consultn-specialize">{consultant.specialize}</p>
      <button className="appointment-button" onClick={handleNavigate}>
        <MdAssignmentAdd className="appointment-icon" />{" "}
        {/* Add the icon here */}
        Make an Appointment
      </button>
    </div>
  );
};

export default ConsultantCard;
