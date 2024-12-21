// src/components/Specialties.jsx
import React from "react";
import specialties from "../../assets/tempdata/specialties"; // Adjust path based on your structure
import "./SpecialtiesStyles.scss";

const Specialties = () => {
  return (
    <div className="specialties-container">
      {specialties.map((service) => (
        <div className="specialty-card" key={service.id}>
          <div className="specialty-icon">{service.icon}</div>
          <h3 className="specialty-title">{service.title}</h3>
          <p className="specialty-description">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Specialties;
