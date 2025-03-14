import React, { useState, useContext } from "react";
import "./ClientAppointmentsStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import AppointmentCard from "../../../components/AppointmentCard/AppointmentCard";
import Footer from "../../../components/Footer/Footer";
import Table from "../../../components/Table/Table";
import { StoreContext } from "../../../StoreContext/StoreContext";
import { useEffect } from "react";
import axios from "axios";
const ClientAppointments = () => {
  const [filter, setFilter] = useState("ALL");
  const { userId } = useContext(StoreContext);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/api/appointments/get_appointments_by_clientId?userId=${userId}`
      )
      .then((response) => {
        const preparedAppointments = response.data.map((appointment) => ({
          id: appointment.id,
          counselorName: appointment.counselorName,
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

  const isToday = (date) => {
    const today = new Date();
    const sessionDate = new Date(date);
    return (
      sessionDate.getDate() === today.getDate() &&
      sessionDate.getMonth() === today.getMonth() &&
      sessionDate.getFullYear() === today.getFullYear()
    );
  };
  const todaySessions = appointments.filter((appointment) =>
    isToday(appointment.date)
  );
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

  const filteredAppointments = appointments.filter((appointment) => {
    const status = appointment.status;
    if (filter === "ALL") return true;
    return status === filter;
  });

  const tableHeaders = ["Appo. ID", "Counselor", "Date", "Time", "Status"];
  const tableBody = filteredAppointments.map((appointment) => ({
    id: appointment.id,
    counselorName: appointment.counselorName,
    date: appointment.date,
    timeSlot: appointment.timeSlot,
    status: appointment.status,
  }));

  return (
    <>
      <div className="appoinments-container">
        <SectionContainer title="Today's Sessions">
          <div className="today-sesstions">
            {todaySessions.length === 0 ? (
              <div className="no-data-notice">
                No traning sessions for today.
              </div>
            ) : (
              todaySessions.map((booking) => (
                <AppointmentCard key={booking.id} appointment={booking} />
              ))
            )}
          </div>
        </SectionContainer>
        <SectionContainer title="All Sessions">
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
        </SectionContainer>
      </div>
    </>
  );
};

export default ClientAppointments;
