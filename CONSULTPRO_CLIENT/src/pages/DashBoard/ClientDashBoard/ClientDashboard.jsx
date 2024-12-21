import React, { useState, useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";
import "./ClientDashboardStyles.scss";
import consult_list from "/src/assets/tempdata/consult_list.js";
import ConsultantCard from "../../../components/ConsultantCard/ConsultantCard";
import Specialties from "../../../components/Specialties/Specialties";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import RecentAppointments from "../../../components/AppointmentCard/ClientAppointmentCard/ClientAppointmentCard";
import JitsiMeeting from "../../../components/ChatRoom/JitsiMeeting";

const ClientDashboard = () => {
  const [featuredConsultant, setFeaturedConsultant] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const consultsPerPage = 4;

  useEffect(() => {
    // const topConsultants = consult_list.slice(0, 4);
    const topConsultants = consult_list;
    setFeaturedConsultant(topConsultants);
  }, []);

  const nextConsults = () => {
    if (currentIndex != 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const previousConsults = () => {
    if (currentIndex + consultsPerPage < featuredConsultant.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentConsults = featuredConsultant.slice(
    currentIndex,
    currentIndex + consultsPerPage
  );

  const appointments = [
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
    {
      id: 3,
      consultantName: "Pratima J Singh",
      consultantImg:
        "https://media.gettyimages.com/id/1488909526/photo/phychologists-portrait-at-his-office.jpg?s=612x612&w=0&k=20&c=2wMPTB23ZzrfrPC2pX8eC9mj2jdzN9rgYtiWCYgDy54=",
      date: "2024-10-22",
      time: "02:00 PM - 04.00 PM",
      status: "Upcoming",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="featured-consultants">
        <SectionContainer title="Featured Counselors">
          <div className="consult-list">
            {/* Previous Button */}
            <div
              onClick={previousConsults}
              className={`pagination-icon left-icon ${
                currentIndex === 0 ? "disabled" : ""
              }`}
            >
              <GrFormPrevious size={30} cursor={"pointer"} />
            </div>
            {currentConsults.map((consult) => (
              <ConsultantCard key={consult.counselor_id} consultant={consult} />
            ))}
            {/* Next Arrow Icon */}
            <div
              onClick={nextConsults}
              className={`pagination-icon right-icon ${
                currentIndex + consultsPerPage >= featuredConsultant.length
                  ? "disabled"
                  : ""
              }`}
            >
              <GrFormNext size={30} cursor={"pointer"} />
            </div>
          </div>
        </SectionContainer>
      </div>

      <div className="recent-apointments-consultants">
        <SectionContainer title="Recent Appointments">
          <div className="recentAppoinemts">
            {appointments.map((appointment) => (
              <RecentAppointments
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>
        </SectionContainer>
      </div>

      <div className="spcialities-consultants">
      <SectionContainer title="Our Spcialities">
        <Specialties />
      </SectionContainer>
      </div>
    </div>
  );
};

export default ClientDashboard;
