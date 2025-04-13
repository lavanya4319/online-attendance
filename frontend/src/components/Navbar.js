// components/Navbar.js
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    alert("Logged out successfully!");
    navigate("/admin");
  };

  const isLoggedIn = !!localStorage.getItem("adminToken");

  return (
    <nav className="navbar">
      <div className="navbar-brand">Face Attendance</div>
      <ul className="navbar-links">
        <li><Link to="/scan">Scan Face</Link></li>
        <li><Link to="/register">Register Face</Link></li>
        <li><Link to="/reports">Attendance Reports</Link></li>
        {isLoggedIn && (
          <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
        )}
      </ul>
    </nav>
  );
}
