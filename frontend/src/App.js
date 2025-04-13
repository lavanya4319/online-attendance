import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import RegisterFace from "./components/RegisterFace";
import ScanFace from "./components/ScanFace";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AttendanceReport from "./components/AttendanceReport";
import './App.css'
function App() {
  return (
    <Router>
      <Navbar />
      <div className="main">
      <Routes>
        
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
  path="/register"
  element={
    <ProtectedRoute>
      <RegisterFace />
    </ProtectedRoute>
  }
/>        <Route path="/scan" element={<ScanFace />} />
        <Route path="/reports" element={<AttendanceReport />} />
      
        
        </Routes>
        </div>
    </Router>
  );
}

export default App;
