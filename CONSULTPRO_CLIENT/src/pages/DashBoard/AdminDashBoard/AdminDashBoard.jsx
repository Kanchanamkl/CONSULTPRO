import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from "react-chartjs-2";
import "./AdminDashBoardStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const AdminDashBoard = () => {
  const stats = {
    clients: 120,
    counselors: 45,
    totalAppointments: 200,
    completedAppointments: 150,
    upcomingAppointments: 50,
  };

  const barData = {
    labels: ["Clients", "Counselors"],
    datasets: [
      {
        label: "Users",
        data: [stats.clients, stats.counselors],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
        
    ],
  };

  const pieData = {
    labels: ["Completed Appointments", "Upcoming Appointments"],
    datasets: [
      {
        data: [stats.completedAppointments, stats.upcomingAppointments],
        backgroundColor: ["#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="admin-dashboard-container">
      <SectionContainer title={"DashBoard"}>
      <div className="stats-container">
        <div className="stat-card">
          <h2>Clients</h2>
          <p>{stats.clients}</p>
        </div>
        <div className="stat-card">
          <h2>Counselors</h2>
          <p>{stats.counselors}</p>
        </div>
        <div className="stat-card">
          <h2>Total Appointments</h2>
          <p>{stats.totalAppointments}</p>
        </div>
        <div className="stat-card">
          <h2>Completed Appointments</h2>
          <p>{stats.completedAppointments}</p>
        </div>
        <div className="stat-card">
          <h2>Upcoming Appointments</h2>
          <p>{stats.upcomingAppointments}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h2>Clients vs Counselors</h2>
          <Bar data={barData} />
        </div>
        <div className="chart">
          <h2>Appointments Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
      </SectionContainer>
    </div>
  );
};

export default AdminDashBoard;