import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PrescriptionListPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch prescription list from the server
    axios
      .get("http://localhost:3001/prescriptions")
      .then((response) => {
        setPrescriptions(response.data);
      })
      .catch((error) => {
        setError("Error fetching prescription list");
        console.error("Error fetching prescription list:", error);
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        color: "#04487A",
        padding: "20px",
        minHeight: "100vh",
        boxSizing: "border-box",
        fontFamily: "times new roman",
      }}
    >
      {error && <div>Error: {error}</div>}
      <h2
        style={{
          fontSize: "24px",
          color: "#04487A",
          fontWeight: "bold",
          fontFamily: "times new roman",
        }}
      >
        Prescription List
      </h2>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
        }}
      >
        {prescriptions.map((prescription) => (
          <li key={prescription.id} style={{ marginBottom: "10px" }}>
            <Link
              to={`/prescriptions/${prescription.id}`}
              style={{
                textDecoration: "none",
                color: "#04487A",
                fontWeight: "bold",
              }}
            >
              Prescription ID: {prescription.id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PrescriptionListPage;
