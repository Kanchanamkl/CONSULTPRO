import React, { useContext, useState } from "react";
import "./ConsultantCardStyles.scss"; // Add styles for the ConsultantCard component
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../StoreContext/StoreContext";

const ConsultantCard = ({ consultant }) => {
  const navigate = useNavigate();
  const { updateSelectedCounselor } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);

  const handleNavigate = () => {
    updateSelectedCounselor(consultant);
    navigate("/book");
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="consultn-card">
      {loading && <div className="spinner"></div>}
      <img
        src={consultant.profilePic}
        alt={consultant.firstName}
        className={`consultn-img ${loading ? "hidden" : ""}`}
        onLoad={handleImageLoad}
      />
       {!loading && (
      <><h3 className="consultn-name">{consultant.firstName}{consultant.lastName}</h3><p className="consultn-specialize">{consultant.specialization}</p><button className="appointment-button" onClick={handleNavigate}>
          <MdAssignmentAdd className="appointment-icon" />{" "}
          Book Now
        </button></>
      )}
    </div>
  );
};

export default ConsultantCard;