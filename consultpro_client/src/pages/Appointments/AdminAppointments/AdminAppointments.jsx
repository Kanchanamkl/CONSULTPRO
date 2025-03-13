import React, { useState ,useEffect } from "react";
import "./AdminAppointmentsStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import Table from "../../../components/Table/Table";
import admin_appointmentsData from "../../../assets/tempdata/admin_appointmentsData";
import axios from "axios";

const AdminAppointments = () => {
  const [filter, setFilter] = useState("ALL");

  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    axios
      .get(
        `http://localhost:8081/api/appointments/get_all_appointments`
      )
      .then((response) => {
        const preparedAppointments = response.data.map((appointment) => ({
          id: appointment.id,
          counselorName: appointment.counselorName,
          clientName:appointment.clientName,
          date: appointment.date,
          timeSlot: appointment.timeSlot,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
          status: getStatus(appointment.date),
          counselorImg: appointment.counselorImg,
        }));
        setAppointments(preparedAppointments);
        console.log("Appointment Data :", response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getStatus = (date) => {
    const today = new Date();
    const appointmentDate = new Date(date);

    if (appointmentDate < today) {
      if (
        appointmentDate.getDate() === today.getDate() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getFullYear() === today.getFullYear()
      ) {
        return "TODAY";
      } else {
        return "COMPLETED";
      }
    } else {
      // return "UPCOMING";
      if (
        appointmentDate.getDate() === today.getDate() &&
        appointmentDate.getMonth() === today.getMonth() &&
        appointmentDate.getFullYear() === today.getFullYear()
      ) {
        return "TODAY";
      } else {
        return "UPCOMING";
      }
    }
  };

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

  const tableHeaders = ["Appo. ID","Consultant", "Client", "Date", "Time", "Status", "Actions"];
  const tableBody = filteredAppointments.map((appointment) => ({
    id: appointment.id,
    counselorName: appointment.counselorName,
    clientName: appointment.clientName,
    date: appointment.date,
    timeSlot: appointment.timeSlot,
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
    <SectionContainer title="All Sessions">
      <div className="admin-appointments-container">
      <div className="filter-options">
            <button
              className={filter === "ALL" ? "active" : ""}
              onClick={() => setFilter("ALL")}
            >
              ALL
            </button>
            <button
              className={filter === "TODAY" ? "active" : ""}
              onClick={() => setFilter("TODAY")}
            >
              TODAY
            </button>
            <button
              className={filter === "UPCOMING" ? "active" : ""}
              onClick={() => setFilter("UPCOMING")}
            >
              UPCOMING
            </button>
            <button
              className={filter === "COMPLETED" ? "active" : ""}
              onClick={() => setFilter("COMPLETED")}
            >
              COMPLETED
            </button>
          </div>
        {filteredAppointments.length === 0 ? (
            <p>No sessions available.</p>
          ) : (
            <Table headers={tableHeaders} body={tableBody} />
          )}
      </div>
      {/* <Footer /> */}
      </SectionContainer>
    </>
  );
};

export default AdminAppointments;
