import React from "react";
import VoiceList from "../components/CRM/VoiceList";
const VoiceListPage = () => {
  return (
    <div>
      <div>
        <div className="page"></div>
        <div className="page-container">
          <h1>고객의소리</h1>
          <VoiceList />
        </div>
      </div>
    </div>
  );
};

export default VoiceListPage;
