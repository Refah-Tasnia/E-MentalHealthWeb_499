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
    // Create a new video element for emotion detection
    const emotionVideo = document.createElement("video");
    emotionVideo.srcObject = stream;

    // Play the video to start capturing frames
    emotionVideo.play().catch((error) => {
      console.error("Error playing video for emotion detection:", error);
    });

    // When enough frames are available, stop the video and extract frames for processing
    emotionVideo.oncanplay = () => {
      // Stop the video
      emotionVideo.pause();

      // Create a canvas element to extract frames
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set canvas dimensions
      canvas.width = emotionVideo.videoWidth;
      canvas.height = emotionVideo.videoHeight;

      // Draw the video frame onto the canvas
      context.drawImage(emotionVideo, 0, 0, canvas.width, canvas.height);

      // Extract the frame as an image blob
      canvas.toBlob((blob) => {
        // Create a FormData object to send the blob to the server
        const formData = new FormData();
        formData.append("video", blob, "emotion_video.webm");

        // Send the video blob to the backend for emotion detection
        fetch("/emotion-detection", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle emotion detection results
            console.log("Emotion detection results:", data);
          })
          .catch((error) =>
            console.error("Error during emotion detection:", error)
          );
      }, "video/webm");
    };
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

/*import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { Link } from "react-router-dom";



const Room = () => {
  const { roomId } = useParams();
  const myMeeting = async (element) => {
    const appID = 191973647;
    const serverSecret = "2a78b0a81aa190cc225fe71b196f01d4";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      Date.now().toString(),
      `${roomId}`
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:3000/room/${roomId}`,
        },
      ],
      onJoinRoom: (room) => {
        room.on("stream", (stream) => {
          // Handle the incoming audio stream
          // For example, play it through an audio element
          const audioElement = document.createElement("audio");
          audioElement.srcObject = stream;
          audioElement.play();
        });
      },

      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: false,
      showTextChat: true,
      showUserList: true,
      maxUsers: 2,
      layout: "Auto",
      showLayoutButton: false,
      enableStereo: true,
      showNonVideoUser: true,
      showTurnOffRemoteCameraButton: true,
      showTurnOffRemoteMicrophoneButton: true,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      videoResolutionList: [
        ZegoUIKitPrebuilt.VideoResolution_360P,
        ZegoUIKitPrebuilt.VideoResolution_180P,
        ZegoUIKitPrebuilt.VideoResolution_480P,
        ZegoUIKitPrebuilt.VideoResolution_720P,
      ],
      videoResolutionDefault: ZegoUIKitPrebuilt.VideoResolution_360P,
    });
  };
  return (
    <div>
      <div ref={myMeeting} />
      <center>
        <a href="\">Return Home</a>
      </center>
    </div>
  );
};
export default Room; */
