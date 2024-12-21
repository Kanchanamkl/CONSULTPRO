import React from "react";
import "./ClientAppointmentsStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import AppointmentCard from "../../../components/AppointmentCard/ClientAppointmentCard/ClientAppointmentCard";
import Footer from "../../../components/Footer/Footer";
const ClientAppointments = () => {
  const upcomming_sessions = [
    {
      id: 1,
      consultantName: "Dr. John Smith",
      consultantImg:
        "https://media.gettyimages.com/id/1468678624/photo/nurse-hospital-employee-and-portrait-of-black-man-in-a-healthcare-wellness-and-clinic-feeling.jpg?s=612x612&w=0&k=20&c=AGQPyeEitUPVm3ud_h5_yVX4NKY9mVyXbFf50ZIEtQI=",
      date: "2024-10-20",
      time: "10:00 AM - 12.00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      consultantName: "Aditya Gupta",
      consultantImg:
        "https://media.gettyimages.com/id/1386902483/photo/mental-health-therapist.jpg?s=612x612&w=0&k=20&c=7IMMLLIql2baNxNQFWiI8FWmp024OSzoDXm14iV_wpc=",
      date: "2024-10-21",
      time: "01:00 PM - 03.00 PM",
      status: "Upcoming",
    },
  ];

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

  const completed_sessions = [
    {
      id: 1,
      consultantName: "Pratima J Singh",
      consultantImg:
        "https://media.gettyimages.com/id/1386902483/photo/mental-health-therapist.jpg?s=612x612&w=0&k=20&c=7IMMLLIql2baNxNQFWiI8FWmp024OSzoDXm14iV_wpc=",
      date: "2024-10-22",
      time: "02:00 PM - 04.00 PM",
      status: "Completed",
    },
    {
      id: 2,
      consultantName: "Pratima J Singh",
      consultantImg:
        "https://media.gettyimages.com/id/1488909526/photo/phychologists-portrait-at-his-office.jpg?s=612x612&w=0&k=20&c=2wMPTB23ZzrfrPC2pX8eC9mj2jdzN9rgYtiWCYgDy54=",
      date: "2024-10-22",
      time: "02:00 PM - 04.00 PM",
      status: "Completed",
    },
    {
      id: 3,
      consultantName: "Pratima J Singh",
      consultantImg:
        "https://media.gettyimages.com/id/1488909526/photo/phychologists-portrait-at-his-office.jpg?s=612x612&w=0&k=20&c=2wMPTB23ZzrfrPC2pX8eC9mj2jdzN9rgYtiWCYgDy54=",
      date: "2024-10-22",
      time: "02:00 PM - 04.00 PM",
      status: "Completed",
    },
    {
      id: 4,
      consultantName: "Pratima J Singh",
      consultantImg:
        "https://media.istockphoto.com/id/1395128697/photo/psychologist-session.jpg?s=612x612&w=0&k=20&c=VL2uUVLzrb8VW6WiT-nyvoM3GkZE8kDicDen4uP-MJ0=",
      date: "2024-10-22",
      time: "02:00 PM - 04.00 PM",
      status: "Completed",
    },
  ];

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
        <SectionContainer title="Upcomming Sessions">
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
        </SectionContainer>
      </div>
    </>
  );
};

export default ClientAppointments;
