import React, { useState, useCallback } from "react";
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
