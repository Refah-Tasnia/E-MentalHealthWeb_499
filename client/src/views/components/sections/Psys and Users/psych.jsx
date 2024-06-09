import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
const PsychologistList = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); // Add state for userData

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("refreshed")) {
      // Set the flag in sessionStorage
      sessionStorage.setItem("refreshed", "true");
      // Refresh the page
      window.location.reload();
    }
    // Fetch the list of psychologists from the server
    axios.get("http://localhost:3001/psychologists").then((res) => {
      setPsychologists(res.data);
    });
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3001/login", {
        withCredentials: true,
      });
      if (response.data.userData) {
        setUserData(response.data.userData);
        setLoggedIn(true); // Set loggedIn to true if user data is received
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  checkAuth();

  const handleBookAppointment = (psychologist) => {
    if (!loggedIn) {
      // If user is not logged in, show a message to login
      alert("Please log in to book an appointment.");
      return;
    }
    // If user is logged in, proceed with booking logic
    setSelectedPsychologist(psychologist);
  };

  const handleClearBooking = () => {
    // Clear the selected psychologist
    setSelectedPsychologist(null);
  };

  const handleConfirmAppointment = () => {
    // Assuming you have user data stored in state or context
    const currentUserData = { userID: 1 }; // Example: Replace with actual user data

    // Extract necessary data
    const { userID } = currentUserData;
    const { psyID } = selectedPsychologist; // Assuming you have selectedPsychologist data

    // Construct appointment time (you can modify this part according to your UI)
    const appointmentTime = moment().format("YYYY-MM-DD HH:mm:ss");

    // Make HTTP POST request to backend
    axios
      .post("http://localhost:3001/appointments", {
        userID,
        psyID,
        appointmentTime,
      })
      .then((response) => {
        alert("Appointment confirmed with psychologist:", selectedPsychologist);
        // After confirming, clear the selected psychologist
        setSelectedPsychologist(null);
      })
      .catch((error) => {
        console.error("Error confirming appointment:", error);
        // Handle error scenario (e.g., show error message to user)
      });
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
            <button
              className="btn btn-primary"
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
            backgroundColor: "#d6e4f0",
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
            onClick={handleConfirmAppointment}
          >
            Confirm Appointment
          </button>
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
