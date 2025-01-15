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

  const [selectedSlots, setSelectedSlots] = useState([]);

  const addSlot = (startTime, endTime, description) => {
    setSelectedSlots((prevSlots) => [
      ...prevSlots,
      { startTime, endTime, description },
    ]);
  };
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("username", username);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("role", role);
    localStorage.setItem("profilePic", profilePic);
    localStorage.setItem("userId", userId);
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
    selectedCounselor,
    selectedSlots,
  ]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId("");
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
    isLoggedIn,
    username,
    firstName,
    lastName,
    role,
    profilePic,
    setUserId,
    setIsLoggedIn,
    setUsername,
    setFirstName,
    setLastName,
    setRole,
    setProfilePic,
    setSelectedCounselor,
    handleLogout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
