
import "./App.css";
import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Appointment from "./pages/appointment";
import Profile from "./pages/Profile";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Upload from "./pages/Upload";

import DoctorDashboard from "./doctor/DoctorDashboard";
import DoctorProfile from "./doctor/DoctorProfile";

function AppContent() {
  const { page } = useAuth();
  const showNav = !["login", "register"].includes(page);

  return (
    <div
      style={{
        fontFamily: "'Outfit', 'Nunito Sans', system-ui, sans-serif",
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}body{margin:0;}
        ::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-track{background:#f7f9fc;}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:3px;}
      `}</style>

      {showNav && <Navbar />}

      {page === "home" && <Home />}
      {page === "login" && <Login />}
      {page === "register" && <Register />}
      {(page === "hospitals" || page === "book-appointment" || page === "queue-confirmation") && <Appointment />}
      {page === "profile" && <Profile />}
      {page === "upload" && <Upload />}
      {page === "doctor-dashboard" && <DoctorDashboard />}
      {page === "doctor-profile" && <DoctorProfile />}
      {page === "patients" && <Patients />}
      {page === "patient-detail" && <PatientDetail />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}