import React from "react";
import VoiceList from "../components/CRM/VoiceList";
const VoiceListPage = () => {
  return (
    <div>
      <div>
        <h1>고객의소리 페이지</h1>
        <div className="page"></div>
        <div className="page-container">
          <VoiceList />
        </div>
      </div>
    </div>
  );
};

export default VoiceListPage;
