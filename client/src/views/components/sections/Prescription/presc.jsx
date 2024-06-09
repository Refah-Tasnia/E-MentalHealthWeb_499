import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PrescriptionForm = () => {
  const [prescription, setPrescription] = useState({
    issuedTo: "",
    issuedBy: "",
    age: "",
    gender: "",
    suspectedCategory: "",
    prescriptionText: "",
  });
  const navigate = useNavigate();

  const handlePrescribe = (event) => {
    event.preventDefault();

    const {
      issuedTo,
      issuedBy,
      age,
      gender,
      suspectedCategory,
      prescriptionText,
    } = prescription;

    if (
      !issuedTo ||
      !issuedBy ||
      !age ||
      !gender ||
      !suspectedCategory ||
      !prescriptionText
    ) {
      alert("Please fill in all necessary details");
      return;
    }

    axios
      .post("http://localhost:3001/prescriptions", prescription)
      .then((res) => {
        if (res.data.message === "Prescription submitted successfully") {
          navigate("/");
          alert("Prescription submitted!");
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrescription({ ...prescription, [name]: value });
  };

  return (
    <div
      style={{
        margin: "50px",
        padding: "20px",
        backgroundColor: "#f0f7ff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#21508C",
          height: "90px",
        }}
      >
        Prescription Form
      </h2>
      <form onSubmit={handlePrescribe}>
        <div style={{ display: "flex", gap: "20px", height: "100px" }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "black",
                display: "block",
              }}
            >
              Issued To:
            </label>
            <input
              type="text"
              name="issuedTo"
              value={prescription.issuedTo}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "black",
                display: "block",
              }}
            >
              Issued By:
            </label>
            <input
              type="text"
              name="issuedBy"
              value={prescription.issuedBy}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 0.5 }}>
            <label
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "black",
                display: "block",
              }}
            >
              Age:
            </label>
            <input
              type="text"
              name="age"
              value={prescription.age}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ display: "inline-block" }}>
            <label
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Gender:
            </label>
            <select
              name="gender"
              value={prescription.gender}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label
            style={{
              fontSize: "15px",
              fontWeight: "bold",
              textAlign: "right",
              color: "black",
              margin: "10px",
            }}
          >
            Suspected Categories:
          </label>
          <div>
            <input
              style={{ margin: "10px" }}
              type="radio"
              id="majorDepression"
              name="suspectedCategory"
              value="Major Depression"
              checked={prescription.suspectedCategory === "Major Depression"}
              onChange={handleChange}
            />
            <label style={{ color: "black" }} htmlFor="majorDepression">
              Major Depression
            </label>
          </div>
          <div>
            <input
              style={{ margin: "10px" }}
              type="radio"
              id="persistentDepressiveDisorder"
              name="suspectedCategory"
              value="Persistent Depressive Disorder"
              checked={
                prescription.suspectedCategory ===
                "Persistent Depressive Disorder"
              }
              onChange={handleChange}
            />
            <label
              style={{ color: "black" }}
              htmlFor="persistentDepressiveDisorder"
            >
              Persistent Depressive Disorder
            </label>
          </div>
          <div>
            <input
              style={{ margin: "10px" }}
              type="radio"
              id="bipolarDisorder"
              name="suspectedCategory"
              value="Bipolar Disorder"
              checked={prescription.suspectedCategory === "Bipolar Disorder"}
              onChange={handleChange}
            />
            <label style={{ color: "black" }} htmlFor="bipolarDisorder">
              Bipolar Disorder
            </label>
          </div>
          <div>
            <input
              style={{ margin: "10px" }}
              type="radio"
              id="ocd"
              name="suspectedCategory"
              value="Obsessive-Compulsive Disorder"
              checked={
                prescription.suspectedCategory ===
                "Obsessive-Compulsive Disorder"
              }
              onChange={handleChange}
            />
            <label style={{ color: "black" }} htmlFor="ocd">
              Obsessive-Compulsive Disorder
            </label>
          </div>
        </div>

        <div>
          <label
            style={{ fontWeight: "bold", color: "black", fontSize: "20px" }}
          >
            Prescription Text:
          </label>
          <textarea
            rows={6}
            cols={50}
            name="prescriptionText"
            value={prescription.prescriptionText}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#21508C",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Prescribe
        </button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
