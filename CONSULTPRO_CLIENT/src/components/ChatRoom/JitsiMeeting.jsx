import React, { useRef, useEffect } from "react";
import "./JitisiMeetingStyles.scss";
import { useLocation, useNavigate } from "react-router-dom";

const JitsiMeeting = () => {
  const navigate = useNavigate();
  const jitsiContainerRef = useRef(null);
  const apiRef = useRef(null);

  const startMeeting = () => {
    if (apiRef.current) return;

    const domain = "142.93.215.196"; 
    const options = {
      roomName: "DemoMeeting",
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
      displayName: "demo Client",
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
      <div className="jitsi-meeting-container" ref={jitsiContainerRef} />
    </div>
  );
};

export default JitsiMeeting;
