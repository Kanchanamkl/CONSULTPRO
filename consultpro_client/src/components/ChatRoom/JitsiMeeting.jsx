import React, { useRef, useEffect } from "react";
import "./JitisiMeetingStyles.scss";
import { useLocation, useNavigate } from "react-router-dom";

const JitsiMeeting = ({ currentMeeting }) => {

  const { id, counselorName, clientName, date, timeSlot, startTime, endTime, status, counselorImg } = currentMeeting;
 // const clientName = "demo Client"; // Assuming client name is static for now
  const displayName = counselorName || clientName; // Display the value that is not null
  console.log(counselorName, date, timeSlot);
  const roomName = `meeting-000${id}`;
  const navigate = useNavigate();
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  const startMeeting = () => {
    if (apiRef.current) return;

    const domain = "meet.melotech200.me";
    const options = {
      roomName: roomName,
      width: "100%",
      height: "80%",
      parentNode: jitsiContainerRef.current,
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          // "camera",
          "desktop",
          "fullscreen",
          "fodeviceselection",
          "hangup",
          // "profile",
          "chat",
          "recording",
          "raisehand",
          "videoquality",
          "tileview",
          "download",
          "help",
          "mute-everyone",
        ],
      },
      configOverwrite: {
        disableDeepLinking: true,
      },
      userInfo: {
        displayName: displayName,
      },
    };

    console.log(`Meeting link: https://${domain}/${options.roomName}`);

    apiRef.current = new window.JitsiMeetExternalAPI(domain, options);

    apiRef.current.addListener("readyToClose", () => {
      endMeeting();
    });
  };

  const endMeeting = () => {
    if (apiRef.current) {
      apiRef.current.dispose();
      apiRef.current = null;
      navigate("/appointments");
    }
  };

  useEffect(() => {
    startMeeting();

    return () => {
      endMeeting();
    };
  }, []);

  return (
    <div className="meeting-container">
      <div className="meeting-info">
        <p><strong>{counselorName ? "Counselor" : "Client"}:</strong> {displayName}</p>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time Slot:</strong> {timeSlot}</p>
      </div>
      <div className="jitsi-meeting-container" ref={jitsiContainerRef} />
    </div>
  );
};

export default JitsiMeeting;