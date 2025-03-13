import React, {useContext } from "react";
import "./MeetingPageStyles.scss";
import JitsiMeeting from "../../components/ChatRoom/JitsiMeeting"; 
import { StoreContext } from "../../StoreContext/StoreContext";


const MeetingPage = () => {
   const { currentMeeting } = useContext(StoreContext);
  return (
    <div className="meeting-page-container">
      <JitsiMeeting currentMeeting={currentMeeting}>
      </JitsiMeeting>
    </div>
  );
};

export default MeetingPage;
