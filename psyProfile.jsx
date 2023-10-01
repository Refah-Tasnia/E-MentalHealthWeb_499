import React from "react";

const PsychologistProfile = () => {
  return (
    <div
      style={{
        background: "linear-gradient(rgba(76, 175, 80, 0.8), rgba(76, 175, 80, 0.8)), url('your-background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "black", 
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 text-center">
            <h1 className="title font-bold">Psychologist Profile</h1>
          </div>
        </div>
      </div>
      <div
        className="container"
        style={{
          marginTop: "50px",
          // Change the background color here to bluish
          background: "#83a0c0", // Replace with your desired bluish color code
          padding: "20px",
          borderRadius: "10px", // Optional: Add rounded corners
        }}
      >
        <div className="row">
          <div className="col-md-6">
            <div>
              <h2 style={{ color: "#081726", marginBottom: "15px" }}>
                <strong>Name:</strong> Dr. Waziul Alam Chowdhury
              </h2>
              <h2 style={{ color: "#081726", marginBottom: "15px" }}>
                <strong>Age:</strong> 45
              </h2>
              <h2 style={{ color: "#081726", marginBottom: "15px" }}>
                <strong>Address:</strong> 123 Park Ave, New York
              </h2>
              <h2 style={{ color: "#081726", marginBottom: "15px" }}>
                <strong>Mobile Number:</strong> (555) 123-4567
              </h2>
               <h2 style={{ color: "#081726", marginBottom: "20px" }}>
                <strong>Email:</strong> waziul.alam@gmail.com
              </h2>
              
              <h2 style={{ color: "#081726", marginBottom: "15px" }}>
                <strong>Biography:</strong>Specialized in mental health for Adults and Children, 
                including substance use disorders and are qualified to
                 assess both the mental and physical aspects of psychological
                  problems.
              </h2>
              <h2 style={{ color: "#081726", marginBottom: "15px" }}>
               <strong>Fees :</strong>  1000 taka
              </h2>
              <h2 style={{ color: "#081726", marginBottom: "15px" }}>
                <strong>Availability :</strong> ST- (17:00-22:00) ,MW-( 17:00-22:00)
              </h2>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default PsychologistProfile;
