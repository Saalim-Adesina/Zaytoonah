import React, { createContext, useState, useContext } from "react";

// Create context
const UserContext = createContext();

// Provider wrapper
export const UserProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState({
    allergy: "",
    name: "",
  });

  return (
    <UserContext.Provider value={{ userSettings, setUserSettings }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for easy usage
export const useUser = () => useContext(UserContext);
