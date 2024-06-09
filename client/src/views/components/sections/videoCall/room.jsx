import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import moment from "moment";
import axios from "axios";

const Room = () => {
  const { roomId } = useParams();
  const localVideoRef = useRef();
  const remoteVideoRefs = useRef({});
  const navigate = useNavigate();
  const socketRef = useRef(null);
  const [error, setError] = useState(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [userId, setUserId] = useState(""); // Unique user ID for each session
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userIDInput, setUserIDInput] = useState(""); // State for UserID input
  const [linkInput, setLinkInput] = useState(""); // State for Link input

  useEffect(() => {
    // Generate a random user ID for the session
    const randomUserId = Math.random().toString(36).substr(2, 9);
    setUserId(randomUserId);

    // Connect to the socket server
    socketRef.current = io("http://localhost:3001");

    // Access user media and emit stream to the server
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        socketRef.current.emit("stream", roomId, stream, randomUserId);

        // Start emotion detection
        startEmotionDetection(stream);
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
      });

    // Socket event listeners
    socketRef.current.on("connect_error", (error) => {
      setError("Connection error: " + error.message);
    });

    socketRef.current.emit("joinRoom", roomId);

    socketRef.current.on("userJoined", (userId) => {
      setRemoteStreams((prevStreams) => ({ ...prevStreams, [userId]: null }));
    });

    socketRef.current.on("userLeft", (userId) => {
      setRemoteStreams((prevStreams) => {
        const updatedStreams = { ...prevStreams };
        delete updatedStreams[userId];
        return updatedStreams;
      });
    });

    socketRef.current.on("stream", (stream, userId) => {
      if (userId !== randomUserId) {
        setRemoteStreams((prevStreams) => ({
          ...prevStreams,
          [userId]: stream,
        }));
      }
    });

    // Chat message listener
    socketRef.current.on("message", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    // Trigger Python script execution when user joins the room
    socketRef.current.emit("joinRoomScript", roomId);

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const handleLeaveCall = () => {
    socketRef.current.disconnect();

    const localStream = localVideoRef.current.srcObject;
    if (localStream) {
      const tracks = localStream.getTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    }

    navigate("/VideoHome");
  };

  const handleToggleAudio = () => {
    setIsAudioMuted((prevIsAudioMuted) => !prevIsAudioMuted); // Toggle the state directly
    const localVideoElement = localVideoRef.current;
    const tracks = localVideoElement.srcObject.getAudioTracks();
    tracks.forEach((track) => {
      track.enabled = !isAudioMuted;
    });
  };

  const handleToggleVideo = () => {
    setIsVideoOn((prevIsVideoOn) => !prevIsVideoOn); // Toggle the state directly
    const localVideoElement = localVideoRef.current;
    const tracks = localVideoElement.srcObject.getVideoTracks();
    tracks.forEach((track) => {
      track.enabled = isVideoOn;
    });
  };

  const startEmotionDetection = (stream) => {
    const emotionInterval = setInterval(() => {
      const videoElement = localVideoRef.current;
      const canvasElement = document.createElement("canvas");
      const canvasCtx = canvasElement.getContext("2d");

      canvasCtx.drawImage(
        videoElement,
        0,
        0,
        videoElement.videoWidth,
        videoElement.videoHeight
      );
      const imageData = canvasCtx.getImageData(
        0,
        0,
        videoElement.videoWidth,
        videoElement.videoHeight
      );
      socketRef.current.emit("emotionFrame", roomId, imageData.data); // Send only the image data
    }, 1000 / 10); // Send a frame every 100ms (10 frames per second)

    return () => clearInterval(emotionInterval);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() !== "") {
      const messageData = {
        userId,
        message: newMessage,
      };
      socketRef.current.emit("message", messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      setNewMessage("");
    }
  };

  const handleConfirmation = () => {
    const userID = userIDInput;
    const link = linkInput;

    axios
      .post("http://localhost:3001/confirmation", {
        userID,
        link,
      })
      .then((response) => {
        alert("Appointment Link Sent!");
      })
      .catch((error) => {
        console.error("Error:", error); // Handle error
      });
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: "0 0 25%",
          padding: "10px",
          borderRight: "1px solid #ccc",
        }}
      >
        {/* Sidebar content here */}

        <div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="userID" style={{ fontWeight: "bold" }}>
              User ID:
            </label>
            <input
              type="text"
              id="userID"
              name="userID"
              value={userIDInput}
              onChange={(e) => setUserIDInput(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="link" style={{ fontWeight: "bold" }}>
              Link:
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={linkInput}
              defaultValue={window.location.href}
              onChange={(e) => setLinkInput(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontWeight: "bold",
              }}
            />
          </div>

          <button onClick={handleConfirmation} style={{ fontWeight: "bold" }}>
            Confirm
          </button>
        </div>
        <div>
          <h5>Chat</h5>
        </div>
        <div
          style={{
            height: "calc(100vh - 20px - 80px - 20px - 20px)",
            overflowY: "auto",
          }}
        >
          {messages.map((messageData, index) => (
            <div key={index} style={{ fontWeight: "bold" }}>
              {messageData.userID}: {messageData.message}
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: "10px",
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </form>
      </div>
      <div style={{ flex: "1" }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            {Object.entries(remoteStreams).map(([userId, stream]) => (
              <video
                key={userId}
                ref={(ref) => (remoteVideoRefs.current[userId] = ref)}
                autoPlay
                style={{
                  width: "100px",
                  height: "auto",
                  marginRight: "10px",
                  borderRadius: "4px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            ))}
          </div>
          <video
            ref={localVideoRef}
            autoPlay
            controls
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <div className="buttons-container">
            <button className="leave-call-button" onClick={handleLeaveCall}>
              Leave Call
            </button>
            <button className="toggle-audio-button" onClick={handleToggleAudio}>
              {isAudioMuted ? "Unmute Audio" : "Mute Audio"}
            </button>
            <button className="toggle-video-button" onClick={handleToggleVideo}>
              {isVideoOn ? "Turn Off Video" : "Turn On Video"}
            </button>
          </div>
          <style>{`
              .buttons-container {
                position: absolute;
                bottom: 10px;
                left: 10px;
                display: flex;
                flex-direction: row;
                align-items: center;
              }
  
              button {
                margin-right: 10px;
                border: none;
                border-radius: 8px;
                min-width: 130px;
                height: 40px;
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-weight: bold;
              }
  
              .leave-call-button {
                background-color: #ea4335;
                color: #fff;
              }
  
              .toggle-audio-button, .toggle-video-button {
                background-color: #f4b400;
                color: #fff;
              }
  
              .toggle-video-button {
                background-color: #1a73e8;
              }
  
              button:hover {
                background-color: rgba(0, 0, 0, 0.1);
              }
            `}</style>
        </div>
      </div>
    </div>
  );
};

export default Room;
