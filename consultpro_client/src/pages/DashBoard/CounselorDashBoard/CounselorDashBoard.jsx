import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import "./CounselorDashBoardStyles.scss";
import SectionContainer from "../../../components/SectionContainer/SectionContainer";

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const CounselorDashBoard = () => {
  const stats = {
    totalClients: 50,
    totalSessions: 120,
    upcomingSessions: 17,
    completedSessions: 30,
  };

  const pieData = {
    labels: ["Upcoming Sessions", "Completed Sessions"],
    datasets: [
      {
        data: [stats.upcomingSessions, stats.completedSessions],
        backgroundColor: ["#FFCE56", "#4CAF50"],
      },
    ],
  };

  return (
    <div className="counselor-dashboard-container">
      <SectionContainer title={"Counselor Dashboard"}>
    
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Clients</h2>
          <p>{stats.totalClients}</p>
        </div>
        <div className="stat-card">
          <h2>Total Sessions</h2>
          <p>{stats.totalSessions}</p>
        </div>
        <div className="stat-card">
          <h2>Upcoming Sessions</h2>
          <p>{stats.upcomingSessions}</p>
        </div>
        <div className="stat-card">
          <h2>Completed Sessions</h2>
          <p>{stats.completedSessions}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h2>Sessions Distribution</h2>
          <Pie data={pieData} />
        </div>
      </div>
      </SectionContainer>
    </div>
  );
};

export default CounselorDashBoard;