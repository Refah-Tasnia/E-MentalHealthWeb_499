import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const PsyAdmin = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of psychologists from the server
    axios.get("http://localhost:3001/psychologists").then((res) => {
      setPsychologists(res.data);
    });
  }, []);

  const handleClearBooking = () => {
    // Clear the selected psychologist
    setSelectedPsychologist(null);
  };

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
      <h1
        style={{
          fontSize: "24px",
          color: "#04487A",
          fontWeight: "bold",
          fontFamily: "times new roman",
        }}
      >
        List of Psychologists
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {psychologists.map((psychologist) => (
          <div
            key={psychologist.id}
            style={{
              backgroundColor: "#d6e4f0",
              width: "48%",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                margin: 0,
                fontWeight: "bold",
              }}
            >
              {psychologist.psyName}
            </p>
            <p>Email: {psychologist.email}</p>
            <p>Phone: +880 {psychologist.phone}</p>
            {/* Removed the Book Appointment button */}
          </div>
        ))}
      </div>

      {/* Back to Home button */}
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default PsyAdmin;
