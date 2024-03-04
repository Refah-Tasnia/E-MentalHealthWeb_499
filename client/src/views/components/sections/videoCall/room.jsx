import React from "react";
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
          url: `http://localhost3000/room/${roomId}`,
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
export default Room;
