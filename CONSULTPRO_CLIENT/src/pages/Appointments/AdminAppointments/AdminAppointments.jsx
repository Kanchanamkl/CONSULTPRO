import React, { useState } from "react";
import "./AdminAppointmentsStyles.scss";
import Table from "../../../components/Table/Table";
import admin_appointmentsData from "../../../assets/tempdata/admin_appointmentsData";

const AdminAppointments = () => {
  const [filter, setFilter] = useState("ALL");

  const [appointments, setAppointments] = useState(admin_appointmentsData);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleDelete = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  const handleReschedule = (id) => {};

  const filteredAppointments =
    filter === "ALL"
      ? appointments
      : appointments.filter((appointment) => appointment.status === filter);

  const headers = ["Consultant", "Client", "Date", "Time", "Status", "Actions"];
  const body = filteredAppointments.map((appointment) => ({
    consultantName: appointment.consultantName,
    clientName: appointment.clientName,
    date: appointment.date,
    time: `${appointment.start.time} ${appointment.start.period} - ${appointment.end.time} ${appointment.end.period}`,
    status: appointment.status,
    actions: (
      <>
        <button onClick={() => handleReschedule(appointment.id)}>
          Reschedule
        </button>
        <button onClick={() => handleDelete(appointment.id)}>Delete</button>
      </>
    ),
  }));

  return (
    <>
      <div className="admin-appointments-container">
        <div className="filter-container">
          <button
            className={filter === "ALL" ? "active" : ""}
            onClick={() => handleFilterChange("ALL")}
          >
            All
          </button>
          <button
            className={filter === "Today" ? "active" : ""}
            onClick={() => handleFilterChange("Today")}
          >
            Today
          </button>
          <button
            className={filter === "Upcoming" ? "active" : ""}
            onClick={() => handleFilterChange("Upcoming")}
          >
            Upcoming
          </button>
          <button
            className={filter === "Complete" ? "active" : ""}
            onClick={() => handleFilterChange("Complete")}
          >
            Complete
          </button>
        </div>
        <Table headers={headers} body={body} />
      </div>
      <Footer />
    </>
  );
};

export default AdminAppointments;
