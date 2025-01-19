import React from "react";
import ConsultantCard from "../../components/ConsultantCard/ConsultantCard";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import "./ConsultantStyles.scss";
import consult_list from "/src/assets/tempdata/consult_list.js";
const Consultants = () => {
  const [consultants, setConsultants] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:8080/api/users/get-active-counselors")
      .then((response) => response.json())
      .then((data) => setConsultants(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="consultants-container">
      <SectionContainer title="Book an Appointment">
        <div className="consult-list">
          {consultants.map((consult) => (
            <ConsultantCard key={consult.id} consultant={consult} />
          ))}
        </div>
      </SectionContainer>
    </div>
  );
};
export default Consultants;
