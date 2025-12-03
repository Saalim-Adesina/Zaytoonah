import React, { createContext, useContext, useState } from "react";

// Create context
const UserContext = createContext();

// Provider wrapper
export const UserProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState({
    name: "Saalim",
    email: "saalim@example.com",
    avatar: require('../../assets/images/3d_avatar_21.png'),
    conditions: [],
    details: [],
    stats: {
      age: '',
      weight: '',
      height: ''
    }
  });

  const updateProfile = (updates) => {
    setUserSettings(prev => ({ ...prev, ...updates }));
  };

  const logout = () => {
    // Reset to initial state or clear specific fields
    setUserSettings({
      name: "",
      email: "",
      avatar: null,
      conditions: [],
      details: [],
      stats: { age: '', weight: '', height: '' }
    });
  };

  return (
    <UserContext.Provider value={{ userSettings, setUserSettings, updateProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook for easy usage
export const useUser = () => useContext(UserContext);
