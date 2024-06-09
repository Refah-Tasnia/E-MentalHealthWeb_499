import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PrescriptionDetailsPage = () => {
  const { id } = useParams(); // Get the prescription ID from the URL
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch prescription details from the server
    axios
      .get(`http://localhost:3001/prescriptions/${id}`)
      .then((response) => {
        setPrescriptionDetails(response.data);
      })
      .catch((error) => {
        setError("Error fetching prescription details");
        console.error("Error fetching prescription details:", error);
      });
  }, [id]); // Dependency array includes id to refetch if id changes

  return (
    <div style={{ padding: "20px" }}>
      {error && <div>Error: {error}</div>}
      {prescriptionDetails && (
        <div
          style={{
            margin: "50px",
            padding: "20px",
            backgroundColor: "#f0f7ff",
            fontFamily: "Arial, sans-serif",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "left" }}>
              <p style={{ fontWeight: "bold", color: "#333" }}>
                Doctor: {prescriptionDetails.issuedBy}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontWeight: "bold", color: "#333" }}>
                Date: {prescriptionDetails.date}
              </p>
            </div>
          </div>
          <hr />
          <div>
            <p style={{ fontWeight: "bold", color: "#333" }}>
              Patient Information:
            </p>
            <p style={{ color: "#333" }}>
              Name: {prescriptionDetails.issuedTo}
            </p>
            <p style={{ color: "#333" }}>
              Gender: {prescriptionDetails.gender}
            </p>
            <p style={{ color: "#333" }}>Age: {prescriptionDetails.age}</p>
          </div>
          <hr />
          <div>
            <p style={{ fontWeight: "bold", color: "#333" }}>
              Suspected Disorder:
            </p>
            <p style={{ color: "#333" }}>
              {prescriptionDetails.suspectedCategory}
            </p>
          </div>
          <hr />
          <div>
            <p style={{ fontWeight: "bold", color: "#333" }}>Prescription:</p>
            <p style={{ color: "#333" }}>
              {prescriptionDetails.prescriptionText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionDetailsPage;
