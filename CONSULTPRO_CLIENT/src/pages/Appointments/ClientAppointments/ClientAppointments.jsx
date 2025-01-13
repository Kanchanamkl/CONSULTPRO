import React, {useState } from "react";
import "./ClientAppointmentsStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import AppointmentCard from "../../../components/AppointmentCard/ClientAppointmentCard/ClientAppointmentCard";
import Footer from "../../../components/Footer/Footer";
import Table from "../../../components/Table/Table";
const ClientAppointments = () => {
    const [filter, setFilter] = useState("ALL");
  // const upcomming_sessions = [
  //   {
  //     id: 1,
  //     consultantName: "Dr. John Smith",
  //     consultantImg:
  //       "https://media.gettyimages.com/id/1468678624/photo/nurse-hospital-employee-and-portrait-of-black-man-in-a-healthcare-wellness-and-clinic-feeling.jpg?s=612x612&w=0&k=20&c=AGQPyeEitUPVm3ud_h5_yVX4NKY9mVyXbFf50ZIEtQI=",
  //     date: "2024-10-20",
  //     time: "10:00 AM - 12.00 AM",
  //     status: "Upcoming",
  //   },
  //   {
  //     id: 2,
  //     consultantName: "Aditya Gupta",
  //     consultantImg:
  //       "https://media.gettyimages.com/id/1386902483/photo/mental-health-therapist.jpg?s=612x612&w=0&k=20&c=7IMMLLIql2baNxNQFWiI8FWmp024OSzoDXm14iV_wpc=",
  //     date: "2024-10-21",
  //     time: "01:00 PM - 03.00 PM",
  //     status: "Upcoming",
  //   },
  // ];

    const [appointments, setAppointments] = useState([
      {
        id: 1,
        counselorName: "Alice Johnson",
        clientImg: "https://example.com/client3.jpg",
        date: "2024-11-03",
        time: "02:00 PM - 04:00 PM",
        status: "Upcoming",
      },
      {
        id: 2,
        counselorName: "Bob Brown",
        clientImg: "https://example.com/client4.jpg",
        date: "2024-11-04",
        time: "10:00 AM - 12:00 PM",
        status: "Upcoming",
      },
      {
        id: 3,
        counselorName: "Charlie Davis",
        clientImg: "https://example.com/client5.jpg",
        date: "2024-10-22",
        time: "02:00 PM - 04:00 PM",
        status: "Completed",
      },
      {
        id: 4,
        counselorName: "Eve White",
        clientImg: "https://example.com/client6.jpg",
        date: "2024-10-23",
        time: "10:00 AM - 12:00 PM",
        status: "Completed",
      },
      {
        id: 5,
        counselorName: "John Doe",
        clientImg: "https://example.com/client1.jpg",
        date: "2024-11-02",
        time: "02:00 PM - 04:00 PM",
        status: "Today",
      },
      {
        id: 6,
        counselorName: "Jane Smith",
        clientImg: "https://example.com/client2.jpg",
        date: "2024-11-02",
        time: "10:00 AM - 12:00 PM",
        status: "Today",
      },
    ]);

  const today_sessions = [
    {
      id: 3,
      consultantName: "Pratima J Singh",
      consultantImg:
        "https://media.gettyimages.com/id/1386902483/photo/mental-health-therapist.jpg?s=612x612&w=0&k=20&c=7IMMLLIql2baNxNQFWiI8FWmp024OSzoDXm14iV_wpc=",
      date: "2024-11-02",
      time: "02:00 PM - 04.00 PM",
      status: "Today",
    },
  ];

  // const completed_sessions = [
  //   {
  //     id: 1,
  //     consultantName: "Pratima J Singh",
  //     consultantImg:
  //       "https://media.gettyimages.com/id/1386902483/photo/mental-health-therapist.jpg?s=612x612&w=0&k=20&c=7IMMLLIql2baNxNQFWiI8FWmp024OSzoDXm14iV_wpc=",
  //     date: "2024-10-22",
  //     time: "02:00 PM - 04.00 PM",
  //     status: "Completed",
  //   },
  //   {
  //     id: 2,
  //     consultantName: "Pratima J Singh",
  //     consultantImg:
  //       "https://media.gettyimages.com/id/1488909526/photo/phychologists-portrait-at-his-office.jpg?s=612x612&w=0&k=20&c=2wMPTB23ZzrfrPC2pX8eC9mj2jdzN9rgYtiWCYgDy54=",
  //     date: "2024-10-22",
  //     time: "02:00 PM - 04.00 PM",
  //     status: "Completed",
  //   },
  //   {
  //     id: 3,
  //     consultantName: "Pratima J Singh",
  //     consultantImg:
  //       "https://media.gettyimages.com/id/1488909526/photo/phychologists-portrait-at-his-office.jpg?s=612x612&w=0&k=20&c=2wMPTB23ZzrfrPC2pX8eC9mj2jdzN9rgYtiWCYgDy54=",
  //     date: "2024-10-22",
  //     time: "02:00 PM - 04.00 PM",
  //     status: "Completed",
  //   },
  //   {
  //     id: 4,
  //     consultantName: "Pratima J Singh",
  //     consultantImg:
  //       "https://media.istockphoto.com/id/1395128697/photo/psychologist-session.jpg?s=612x612&w=0&k=20&c=VL2uUVLzrb8VW6WiT-nyvoM3GkZE8kDicDen4uP-MJ0=",
  //     date: "2024-10-22",
  //     time: "02:00 PM - 04.00 PM",
  //     status: "Completed",
  //   },
  // ];
  const handleFilterChange = (status) => {
    setFilter(status);
  };
  const filteredAppointments =
    filter === "ALL"
      ? appointments
      : appointments.filter((appointment) => appointment.status === filter);

  const headers = ["Counselor", "Date", "Time", "Status"];
  const body = filteredAppointments.map((appointment) => ({
    counselorName: appointment.counselorName,
    date: appointment.date,
    time: appointment.time,
    status: appointment.status,
  }));

  return (
    <>
      <div className="appoinments-container">
        {/* <h1>Appoinments Page</h1> */}
        <SectionContainer title="Today Sessions">
          <div className="appoinments">
            {today_sessions.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
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
          <Table headers={headers} body={body} />
        </SectionContainer>
        {/* <SectionContainer title="Upcomming Sessions">
          <div className="appoinments">
            {upcomming_sessions.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </SectionContainer>
        <SectionContainer title="Completed Sessions">
          <div className="appoinments">
            {completed_sessions.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </SectionContainer> */}
      </div>
    </>
  );
};

export default ClientAppointments;
