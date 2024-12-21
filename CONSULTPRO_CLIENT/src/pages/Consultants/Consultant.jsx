import React from "react";
import ConsultantCard from "../../components/ConsultantCard/ConsultantCard";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import "./ConsultantStyles.scss";
import consult_list from "/src/assets/tempdata/consult_list.js";
const Consultants = () => {
  return (
    <div className="consultants-container">
      <SectionContainer title="Book an Appoinment">
        <div className="consult-list">
          {consult_list.map((consult) => (
            <ConsultantCard key={consult.counselor_id} consultant={consult} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};
export default Consultants;
