import React, { useEffect, useState } from "react";
import axios from "axios";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Fetch all appointments
    axios
      .get("http://localhost:3001/appointments")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => {
        console.error("Error fetching appointments", err);
      });
  }, []); // Fetch appointments only once when the component mounts

  // Render appointments
  return (
    <div style={{ marginTop: "20px" }}>
      <h2 style={{ fontWeight: "bold" }}>Appointments</h2>
      <ul style={{ listStyleType: "none", padding: "0", margin: "0" }}>
        {appointments.map((appointment) => (
          <li
            key={appointment.appointmentID}
            style={{ marginBottom: "10px", fontWeight: "bold" }}
          >
            <span>User ID:</span> {appointment.userID},<span> Psy ID:</span>{" "}
            {appointment.psyID},<span> Time:</span>{" "}
            {appointment.appointmentTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
