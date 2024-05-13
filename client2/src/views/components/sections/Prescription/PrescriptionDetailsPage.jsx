import React, { useState, useEffect } from "react";
import axios from "axios";

const PrescriptionDetailsPage = () => {
  const [prescriptionDetails, setPrescriptionDetails] = useState(null);

  useEffect(() => {
    // Fetch prescription details from the server
    axios.get("/prescription").then((response) => {
      setPrescriptionDetails(response.data);
    });
  }, []);

  return (
    <div>
      {prescriptionDetails && (
        <div
          style={{
            margin: "50px",
            padding: "20px",
            backgroundColor: "#f0f7ff",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "left" }}>
              <p>Doctor: {prescriptionDetails.issuedBy}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p>Date: {prescriptionDetails.date}</p>
            </div>
          </div>
          <hr />
          <div>
            <p>Patient Information:</p>
            <p>Name: {prescriptionDetails.issuedTo}</p>
            <p>Gender: {prescriptionDetails.gender}</p>
            <p>Age: {prescriptionDetails.age}</p>
          </div>
          <hr />
          <div>
            <p>Suspected Disorder: {prescriptionDetails.suspectedCategory}</p>
          </div>
          <hr />
          <div>
            <p>Prescription:</p>
            <p>{prescriptionDetails.prescriptionText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionDetailsPage;
