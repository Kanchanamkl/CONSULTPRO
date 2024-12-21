import { createContext, useEffect } from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

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

  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const updateSelectedConsultant = (consultant) => {
    setSelectedConsultant(consultant);
  };
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("username", username);
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("role", role);
  }, [isLoggedIn, firstName, lastName, role]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setFirstName("");
    setLastName("");
    setRole("");
    localStorage.clear();
    navigate("/");
  };

  const contextValue = {
    isLoggedIn,
    username,
    setIsLoggedIn,
    firstName,
    lastName,
    role,
    setUsername,
    setFirstName,
    setLastName,
    setRole,
    handleLogout,
    selectedConsultant,
    updateSelectedConsultant,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
