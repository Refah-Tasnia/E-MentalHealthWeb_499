import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PsychologistList = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of psychologists from the server
    axios.get("http://localhost:3001/psychologists").then((res) => {
      setPsychologists(res.data);
    });
  }, []);

  const handleBookAppointment = (psychologist) => {
    // Implement your booking logic here
    // For example, you can show a modal or navigate to a booking page
    setSelectedPsychologist(psychologist);
  };

  const handleClearBooking = () => {
    // Clear the selected psychologist
    setSelectedPsychologist(null);
  };

  return (
    <div
      style={{
        backgroundColor: "#fff", // White background
        color: "#04487A", // Corrected text color
        padding: "20px", // Padding for content
        minHeight: "100vh", // Set the minimum height to 100% of the viewport
        boxSizing: "border-box", // Ensure padding is included in the total height
        fontFamily: "times new roman", // Different font family
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
              backgroundColor: "#d6e4f0", // Lightened blue background for list item
              width: "48%", // Set the width for each psychologist box
              padding: "8px", // Shorter padding for list item
              marginBottom: "8px", // Smaller spacing between list items
              borderRadius: "5px", // Optional: Rounded corners for list item
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                margin: 0,
                fontWeight: "bold", // Bold text
              }}
            >
              {psychologist.psyName}
            </p>
            <p>Email: {psychologist.email}</p>
            <p>Phone: +880 {psychologist.phone}</p>
            <button
              class="btn btn-primary"
              onClick={() => handleBookAppointment(psychologist)}
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {/* Display the booking option */}
      {selectedPsychologist && (
        <div
          style={{
            backgroundColor: "#d6e4f0", // Lightened blue background
            padding: "20px",
            borderRadius: "5px",
            marginTop: "20px",
            color: "#04487A",
          }}
        >
          <h2 style={{ fontWeight: "bold" }}>Book Appointment</h2>
          <p>
            Selected Psychologist: {selectedPsychologist.psyName} -{" "}
            {selectedPsychologist.email}
          </p>
          {/* Implement your booking form or logic here */}
          {/* For example, you can show a modal or navigate to a booking page */}
          <button
            className="btn btn-outline-primary"
            onClick={handleClearBooking}
          >
            Clear Booking
          </button>
        </div>
      )}

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

export default PsychologistList;
