import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Make a request to the server's logout endpoint
      await axios.post("http://localhost:3001/logout");

      // Redirect to the login page or perform any other desired action
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        padding: "20px",
        fontFamily: "Times New Roman",
      }}
    >
      <h1 style={{ color: "#333", fontWeight: "bold" }}>Admin Dashboard</h1>
      <nav style={{ marginBottom: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0, display: "flex" }}>
          <li style={{ marginRight: "20px" }}>
            <Link
              to="/psyAdmin"
              style={{
                color: "#3498db",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              View Psychologists
            </Link>
          </li>
          <li>
            <Link
              to="/userList"
              style={{
                color: "#3498db",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              View Users
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />

      <Link
        onClick={handleLogout}
        style={{
          color: "#e74c3c",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        Logout
      </Link>
    </div>
  );
};

export default AdminDashboard;
