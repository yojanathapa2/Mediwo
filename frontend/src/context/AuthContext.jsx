
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selHospital, setSelHospital] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);
  const [selPatient, setSelPatient] = useState(null);

  const login = (payload) => {
    setUser(payload);
  };

  const logout = () => {
    setUser(null);
    setPage("home");
    setSelHospital(null);
    setBookingResult(null);
    setSelPatient(null);
  };

  return (
    <AuthContext.Provider
      value={{
        page,
        setPage,
        user,
        setUser,
        selHospital,
        setSelHospital,
        bookingResult,
        setBookingResult,
        selPatient,
        setSelPatient,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};