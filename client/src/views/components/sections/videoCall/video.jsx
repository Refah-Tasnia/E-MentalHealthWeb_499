import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Video = () => {
  const [value, setValue] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userData2, setUserData2] = useState(null);
  const [userID, setUserID] = useState(null);
  const videoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3001/login", {
          withCredentials: true,
        });
        if (response.data.userData) {
          setUserData(response.data.userData);
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (loggedIn && userData.psyName?.startsWith("Dr.")) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setLocalStream(stream);
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing media devices:", error);
        });
    }
  }, [loggedIn, userData]);

  const handleJoinRoom = () => {
    if (value.trim() === "") {
      alert("Please enter a valid room code.");
      return;
    }
    navigate(`/room/${value}`);
  };

  const handleCheckAppointment = async () => {
    try {
      const response = await axios.get("http://localhost:3001/confirmation", {
        withCredentials: true,
      });
      if (response.data.userData2) {
        setUserData2(response.data.userData2);
        if (userData.userID === response.data.userData2.userID) {
          alert("Appointment Found!");
          navigate("/appVideo");
        } else {
          alert("No appointments confirmed yet");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {loggedIn ? (
        <>
          {userData && (
            <>
              {userData.psyName?.startsWith("Dr.") && (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    marginBottom: "20px",
                  }}
                >
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <div style={{ marginBottom: "20px" }}>
                    <input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      type="text"
                      placeholder="Enter/Create a Room Code"
                      style={{
                        padding: "8px",
                        marginRight: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                      }}
                    />
                    <button
                      onClick={handleJoinRoom}
                      style={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              )}
              {userData.userName && (
                <div style={{ marginBottom: "20px" }}>
                  <button
                    onClick={handleCheckAppointment}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "4px",
                      background: "#007bff",
                      color: "#fff",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Check Appointment
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <p>Please login to use this feature.</p>
          <Link to="/login">
            <button
              style={{
                padding: "8px 16px",
                borderRadius: "4px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      )}
      <Link to="/psychologists" style={{ marginRight: "10px" }}>
        Contact a Psychologist
      </Link>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default Video;
