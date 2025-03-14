import React, { useContext } from "react";
import "./App.scss";
import Login from "./pages/Login/Login";
import Register from "./pages/Registration/Register";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreContext } from "./StoreContext/StoreContext";
import SideBar from "./components/SideBar/SideBar";
import ConsultantRegister from "./pages/Registration/ConsultantRegister";
import Profile from "./pages/Profile/ClientProfile/Profie";
import Consultants from "./pages/Consultants/Consultant";
import Applications from "./pages/Applications/Applications";
import CounsellorProfile from "./pages/Profile/CounsellorProfile/CounsellorProfile";
import AddCounselor from "./pages/AddCounselor/AddCounselorPage";
import BookingPage from "./pages/Booking/BookingPage";
import MeetingPage from "./pages/MeetingPage/MeetingPage";
import ClientAppointments from "./pages/Appointments/ClientAppointments/ClientAppointments";
import AdminAppointments from "./pages/Appointments/AdminAppointments/AdminAppointments";
import CounselorAppointments from "./pages/Appointments/CounselorAppointments/CounselorAppointments";
import AdminDashBoard from "./pages/DashBoard/AdminDashBoard/AdminDashBoard";
import CounselorDashBoard from "./pages/DashBoard/CounselorDashBoard/CounselorDashBoard";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import AccountSetUp from "./pages/AccountSetup/AccountSetup";

function App() {
  const { isLoggedIn, role } = useContext(StoreContext);

  if (!isLoggedIn) {
    return (
      <>
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consultant-register" element={<ConsultantRegister />} />
          <Route path="/accSetup" element={<AccountSetUp />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </>
    );
  } else {
    switch (role) {
      case "ADMIN":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<AdminDashBoard />} />
              <Route path="/dashboard" element={<AdminDashBoard />} />
              <Route path="/appointments" element={<AdminAppointments />} />
              <Route path="/consultants" element={<Consultants />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/add-counselor" element={<AddCounselor />} />
              <Route path="*" element={<AdminDashBoard />} />
            </Routes>
            <Footer />
          </>
        );
      case "COUNSELOR":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<CounselorDashBoard />} />
              <Route path="/dashboard" element={<CounselorDashBoard />} />
              <Route path="/appointments" element={<CounselorAppointments />} />
              <Route path="/profile" element={<CounsellorProfile />} />
              <Route path="/meeting-page" element={<MeetingPage />} />
              <Route path="*" element={<CounselorDashBoard />} />
            </Routes>
            <Footer />
          </>
        );
      case "CLIENT":
        return (
          <>
            <SideBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/appointments" element={<ClientAppointments />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/meeting-page" element={<MeetingPage />} />
              <Route path="/consultants" element={<Consultants />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer />
          </>
        );
      default:
        return (
          <>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/consultant-register"
                element={<ConsultantRegister />}
              />
              <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer />
          </>
        );
    }
  }
}

export default App;
