import React, { useState, useEffect } from "react";
import axios from "axios";
import VoiceItem from "./VoiceItem"; // VoiceItem 컴포넌트는 각 소리 항목을 표시할 예정입니다.
import VoiceDetail from "./VoiceDetail";
import "../../styles/VoiceList.css"; // VoiceList에 대한 CSS 파일

const VoiceList = () => {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null); // 선택된 소리 상태를 관리합니다.

  useEffect(() => {
    // 서버에서 고객의 소리 리스트를 가져오는 함수
    const fetchVoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/v1/intrabucks/customer/voiceList"
        );
        setVoices(response.data);
      } catch (error) {
        console.error("고객의 소리 리스트를 가져오는 중 오류 발생:", error);
      }
    };

    fetchVoices();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 함

  // 소리 항목을 클릭했을 때 선택된 소리 상태를 업데이트합니다.
  const handleVoiceClick = (voice) => {
    setSelectedVoice(voice);
  };

  return (
    <div className="container">
      <h2>고객의 소리 리스트</h2>
      <div className="voice-list">
        {/* 모든 소리 항목을 VoiceItem 컴포넌트로 렌더링합니다. */}
        {voices.map((voice) => (
          <VoiceItem
            key={voice.voiceId}
            voice={voice}
            onClick={() => handleVoiceClick(voice)}
          />
        ))}
      </div>
      {/* 선택된 소리가 있을 경우 VoiceDetail 컴포넌트를 렌더링합니다. */}
      {selectedVoice && <VoiceDetail voice={selectedVoice} />}
    </div>
  );
};

export default VoiceList;
