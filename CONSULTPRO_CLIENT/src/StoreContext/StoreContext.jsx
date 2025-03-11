import { createContext, useEffect } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || ""
  );
  const [counselorId, setCounselorId] = useState(
    () => localStorage.getItem("counselorId") || ""
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );
  const [firstName, setFirstName] = useState(
    () => localStorage.getItem("firstName") || ""
  );
  const [lastName, setLastName] = useState(
    () => localStorage.getItem("lastName") || ""
  );
  const [role, setRole] = useState(() => localStorage.getItem("role") || "");
  const [profilePic, setProfilePic] = useState(
    () => localStorage.getItem("profilePic") || ""
  );

  const [selectedCounselor, setSelectedCounselor] = useState(null);

  const updateSelectedCounselor = (coach) => {
    setSelectedCounselor(coach);
  };

  const [selectedSlots, setSelectedSlots] = useState([]);

  const addSlot = (startTime, endTime, description) => {
    setSelectedSlots((prevSlots) => [
      ...prevSlots,
      { startTime, endTime, description },
    ]);
  };

  const [activeCounselors, setActiveCounselors] = useState([]);

  const fetchActiveCounselors = async () => {
    try {
      const response = await fetch(
        "http://142.93.215.196:8081/api//users/get-active-counselors"
      );
      const data = await response.json();
      const formattedData = data.map((counselor) => ({
        counselor_id: counselor.counselor_id,
        name: counselor.firstName + " " + counselor.lastName,
        specialize: counselor.specialize,
        counselor_img: counselor.profilePic,
      }));
      setActiveCounselors(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchActiveCounselors();
    const intervalId = setInterval(fetchActiveCounselors, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("username", username);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("role", role);
    localStorage.setItem("profilePic", profilePic);
    localStorage.setItem("userId", userId);
    localStorage.setItem("counselorId", counselorId);
    localStorage.setItem(
      "selectedCounselor",
      JSON.stringify(selectedCounselor)
    );
  }, [
    isLoggedIn,
    username,
    firstName,
    lastName,
    role,
    profilePic,
    userId,
    counselorId,
    selectedCounselor,
    selectedSlots,
  ]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId("");
    setCounselorId("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setRole("");
    setProfilePic("");
    localStorage.clear();
    navigate("/");
  };

  const contextValue = {
    userId,
    counselorId,
    isLoggedIn,
    username,
    firstName,
    lastName,
    role,
    profilePic,
    activeCounselors,
    selectedCounselor,
    selectedSlots,
    setUserId,
    setCounselorId,
    setIsLoggedIn,
    setUsername,
    setFirstName,
    setLastName,
    setRole,
    setProfilePic,
    setSelectedCounselor,
    updateSelectedCounselor,
    handleLogout,
    setSelectedSlots,
    addSlot,
    fetchActiveCounselors,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
