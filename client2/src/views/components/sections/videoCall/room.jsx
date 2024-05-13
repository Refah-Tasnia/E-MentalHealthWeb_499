import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";

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
    const localVideoElement = localVideoRef.current;
    const tracks = localVideoElement.srcObject.getAudioTracks();
    setIsAudioMuted(!isAudioMuted);

    tracks.forEach((track) => {
      track.enabled = !isAudioMuted;
    });
  };

  const handleToggleVideo = () => {
    const localVideoElement = localVideoRef.current;
    const tracks = localVideoElement.srcObject.getVideoTracks();
    setIsVideoOn(!isVideoOn);

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

  return (
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
      <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
        <button onClick={handleLeaveCall} style={{ marginRight: "10px" }}>
          Leave Call
        </button>
        <button onClick={handleToggleAudio} style={{ marginRight: "10px" }}>
          {isAudioMuted ? "Unmute Audio" : "Mute Audio"}
        </button>
        <button onClick={handleToggleVideo}>
          {isVideoOn ? "Turn Off Video" : "Turn On Video"}
        </button>
      </div>
    </div>
  );
};

export default Room;
