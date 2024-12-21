import React, { useState } from "react";
import "./CounselorAppointmentsStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import TableComponent from "../../../components/Table/Table";
import CounselorAppointmentCard from "../../../components/AppointmentCard/CounselorAppoinmentCard/CounselorAppoinmentCard";

const CounselorAppointments = () => {
  const [filter, setFilter] = useState("ALL");

  const [todayAppointments, setTodayAppointments] = useState([
    {
      id: 1,
      clientName: "John Doe",
      clientImg:
        "https://www.shutterstock.com/shutterstock/photos/1733598437/display_1500/stock-photo-close-up-headshot-portrait-picture-of-smiling-african-american-businesswoman-happy-attractive-1733598437.jpg",
      date: "2024-11-02",
      time: "02:00 PM - 04:00 PM",
      status: "Today",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      clientImg:
        "https://www.shutterstock.com/shutterstock/photos/1437938126/display_1500/stock-photo-headshot-portrait-of-beautiful-african-american-millennial-woman-in-glasses-and-sweater-stand-1437938126.jpg",
      date: "2024-11-02",
      time: "10:00 AM - 12:00 PM",
      status: "Today",
    },
  ]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      clientName: "Alice Johnson",
      clientImg: "https://example.com/client3.jpg",
      date: "2024-11-03",
      time: "02:00 PM - 04:00 PM",
      status: "Upcoming",
    },
    {
      id: 2,
      clientName: "Bob Brown",
      clientImg: "https://example.com/client4.jpg",
      date: "2024-11-04",
      time: "10:00 AM - 12:00 PM",
      status: "Upcoming",
    },
    {
      id: 3,
      clientName: "Charlie Davis",
      clientImg: "https://example.com/client5.jpg",
      date: "2024-10-22",
      time: "02:00 PM - 04:00 PM",
      status: "Completed",
    },
    {
      id: 4,
      clientName: "Eve White",
      clientImg: "https://example.com/client6.jpg",
      date: "2024-10-23",
      time: "10:00 AM - 12:00 PM",
      status: "Completed",
    },
    {
      id: 5,
      clientName: "John Doe",
      clientImg: "https://example.com/client1.jpg",
      date: "2024-11-02",
      time: "02:00 PM - 04:00 PM",
      status: "Today",
    },
    {
      id: 6,
      clientName: "Jane Smith",
      clientImg: "https://example.com/client2.jpg",
      date: "2024-11-02",
      time: "10:00 AM - 12:00 PM",
      status: "Today",
    },
  ]);

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleJoinSession = (id) => {
    // Logic to join the session
    console.log(`Joining session with ID: ${id}`);
  };

  const filteredAppointments =
    filter === "ALL"
      ? appointments
      : appointments.filter((appointment) => appointment.status === filter);

  const headers = ["Client", "Date", "Time", "Status"];
  const body = filteredAppointments.map((appointment) => ({
    clientName: appointment.clientName,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
  }));

  return (
    <div className="counselor-appointments-container">
      <SectionContainer title={"Today Sessions"}>
        <div className="appointments-section">
          <div className="appointments-list">
            {todayAppointments.map((appointment) => (
              <CounselorAppointmentCard
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
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
            className={filter === "Completed" ? "active" : ""}
            onClick={() => handleFilterChange("Completed")}
          >
            Completed
          </button>
        </div>
        <TableComponent headers={headers} body={body} />
      </SectionContainer>
    </div>
  );
};

export default CounselorAppointments;
