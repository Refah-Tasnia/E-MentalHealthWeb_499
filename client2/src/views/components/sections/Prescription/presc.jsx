import React, { useState } from "react";
import axios from "axios";

const PrescriptionForm = () => {
  const [issuedTo, setIssuedTo] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [suspectedCategory, setSuspectedCategory] = useState("");
  const [prescriptionText, setPrescriptionText] = useState("");

  const handlePrescribe = () => {
    // Implement logic to handle the prescription submission
    axios
      .post("/prescription", {
        issuedTo,
        issuedBy,
        age,
        gender,
        suspectedCategory,
        prescriptionText,
      })
      .then((response) => {
        alert("Prescription submitted successfully");
        // Optionally, you can navigate to the prescription details page after submission
        // window.location.href = "/prescription-details";
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // If there is an error message in the response data, display it
          console.error(
            "Error submitting prescription:",
            error.response.data.error
          );
          alert("Error submitting prescription: " + error.response.data.error);
        } else {
          // If there is no specific error message, display a generic error message
          console.error("Error submitting prescription:", error.message);
          alert("Error submitting prescription: " + error.message);
        }
      });
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
      <form>
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
              value={issuedTo}
              onChange={(e) => setIssuedTo(e.target.value)}
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
              value={issuedBy}
              onChange={(e) => setIssuedBy(e.target.value)}
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
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
                value="Major Depression"
                checked={suspectedCategory === "Major Depression"}
                onChange={() => setSuspectedCategory("Major Depression")}
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
                value="Persistent Depressive Disorder"
                checked={suspectedCategory === "Persistent Depressive Disorder"}
                onChange={() =>
                  setSuspectedCategory("Persistent Depressive Disorder")
                }
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
                value="Bipolar Disorder"
                checked={suspectedCategory === "Bipolar Disorder"}
                onChange={() => setSuspectedCategory("Bipolar Disorder")}
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
                value="Obsessive-Compulsive Disorder"
                checked={suspectedCategory === "Obsessive-Compulsive Disorder"}
                onChange={() =>
                  setSuspectedCategory("Obsessive-Compulsive Disorder")
                }
              />
              <label style={{ color: "black" }} htmlFor="ocd">
                Obsessive-Compulsive Disorder
              </label>
            </div>
          </div>
        </div>
        <div>
          <label
            style={{ fontWeight: "bold", color: "black", fontSize: "20px" }}
          >
            Prescribe to the Patient
          </label>
          <div>
            <textarea
              rows={6}
              cols={50}
              value={prescriptionText}
              onChange={(e) => setPrescriptionText(e.target.value)}
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handlePrescribe}
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
