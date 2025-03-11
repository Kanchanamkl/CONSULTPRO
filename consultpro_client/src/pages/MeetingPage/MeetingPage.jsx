import React from "react";
import "./MeetingPageStyles.scss";
import JitsiMeeting from "../../components/ChatRoom/JitsiMeeting"; 

const MeetingPage = () => {
  return (
    <div className="meeting-page-container">
      <JitsiMeeting>
      </JitsiMeeting>
    </div>
  );
};

export default MeetingPage;
