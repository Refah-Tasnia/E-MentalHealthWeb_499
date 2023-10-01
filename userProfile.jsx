import React from "react";

const userProfile = () => {
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
            <h1 className="title font-bold">Your Profile Information</h1>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: "50px" }}>
        <div className="row">
          <div className="col-md-6">
            <div>
              <h2 style={{ color: "#303730", marginBottom: "15px" }}>
                Name                     : Shah Nadim Kamran Rian
              </h2>
              <h2 style={{ color: "#303730", marginBottom: "15px" }}>
                Age                      : 18
              </h2>
              <h2 style={{ color: "#303730", marginBottom: "15px" }}>
                Address                  : Bashundara R/A, Dhaka.
              </h2>
              <h2 style={{ color: "#303730", marginBottom: "15px" }}>
                Mobile Number            : 01710000000
              </h2>
              <h2 style={{ color: "#303730", marginBottom: "15px" }}>
                Previous Assessment Score: 85
              </h2>
            </div>
          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default userProfile;
