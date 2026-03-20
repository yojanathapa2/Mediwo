
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Home from './pages/Home';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Appointment from './pages/appointment';
import ChatbotPage from './pages/ChatbotPage';
import Navbar from './components/Navbar';


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
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={ <Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/profile" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/profile" />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/:patientId"
          element={
            <PrivateRoute>
              <PatientDetail />
            </PrivateRoute>
          }
        />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/" element={<Navigate to={user ? "/profile" : "/login"} />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}