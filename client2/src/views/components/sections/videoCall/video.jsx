import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Video = () => {
  const [value, setValue] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const videoRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    // Get the user's local video stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // Set the local stream state
        setLocalStream(stream);
        // Display the local stream in the video element
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });
  }, []);

  const handleJoinRoom = () => {
    if (value.trim() === "") {
      alert("Please enter a valid room code.");
      return;
    }
    navigate(`/room/${value}`);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "100%", maxWidth: "400px", marginBottom: "20px" }}>
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
      </div>
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
      <div style={{ textAlign: "center" }}>
        <Link to="/psychologists" style={{ marginRight: "10px" }}>
          Contact a Psychologist
        </Link>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
};

export default Video;

/*import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
const Video = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = useCallback(() => {
    navigate(`/room/${value}`);
  }, [navigate, value]);

  const containerStyle = {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const headingStyle = {
    textAlign: "center",
    color: "#333",
  };

  const inputContainerStyle = {
    display: "flex",
    marginTop: "20px",
  };

  const inputStyle = {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    outline: "none",
  };

  const buttonStyle = {
    marginLeft: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    outline: "none",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Video Conferencing</h2>
      <div style={inputContainerStyle}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Enter/Create a Room Code"
          style={inputStyle}
        />
        <button
          onClick={handleJoinRoom}
          style={Object.assign({}, buttonStyle, value && buttonHoverStyle)}
        >
          Join
        </button>
      </div>
      <br />
      <Link to="/psychologists"> Contact a Psychologist</Link>
      <div>
        <br />

        <Link to="/">
          <Button className="btn btn-inverse waves-effect waves-light">
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Video;
*/
