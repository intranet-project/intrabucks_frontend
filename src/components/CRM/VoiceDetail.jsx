import React from "react";

const VoiceDetail = ({ voice }) => {
  return (
    <div className="voice-detail">
      <h2>선택된 소리 정보</h2>
      <p>
        <strong>Title:</strong> {voice.title}
      </p>
      <p>
        <strong>내용</strong> {voice.VoiceDetail}
      </p>
      {/* Voice 엔티티의 다른 필드들을 필요에 따라 표시합니다. */}
    </div>
  );
};

export default VoiceDetail;
