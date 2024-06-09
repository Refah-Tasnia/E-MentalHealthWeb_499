import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AppVideo = () => {
  const [value, setValue] = useState("");
  const [localStream, setLocalStream] = useState(null);
  const [link, setLink] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/confirmation", {
          withCredentials: true,
        });
        if (response.data.userData2 && response.data.userData2.Link) {
          setLink(response.data.userData2.Link);
        }
      } catch (error) {
        console.error("Error fetching link data:", error);
      }
    };

    fetchData();
  }, []);

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

      {link && (
        <div style={{ marginBottom: "10px" }}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Go to link
          </a>
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        <Link to="/psychologists" style={{ marginRight: "10px" }}>
          Contact a Psychologist
        </Link>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
};

export default AppVideo;
