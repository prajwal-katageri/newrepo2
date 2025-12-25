import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import PatientList from "./pages/PatientList";
import AddPatient from "./pages/AddPatient";
import DoctorList from "./pages/Doctor/DoctorList";
import AddDoctor from "./pages/Doctor/AddDoctor";
import AppointmentList from "./pages/Appointment/AppointmentList";
import BookAppointment from "./pages/Appointment/BookAppointment";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <div className="container mx-auto px-4 py-6">
                  <Routes>
                    <Route path="/" element={<PatientList />} />
                    <Route path="/patients" element={<PatientList />} />
                    <Route path="/add" element={<AddPatient />} />
                    <Route path="/doctors" element={<DoctorList />} />
                    <Route path="/doctors/add" element={<AddDoctor />} />
                    <Route path="/appointments" element={<AppointmentList />} />
                    <Route path="/appointments/book" element={<BookAppointment />} />
                    <Route path="*" element={<Navigate to="/patients" replace />} />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
