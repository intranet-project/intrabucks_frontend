import React, { useState, useEffect } from "react";
import axios from "axios";
import VoiceItem from "./VoiceItem";
import "../../styles/VoiceList.css";
import Button from "../Button";

const VoiceList = () => {
  const [voices, setVoices] = useState([]);
  const [filter, setFilter] = useState("전체");

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/v1/intrabucks/customer/voice"
        );
        const sortedVoices = response.data.sort(
          (a, b) => new Date(b.voiceDate) - new Date(a.voiceDate)
        );
        setVoices(sortedVoices);
      } catch (error) {
        console.error("고객의 소리 리스트를 가져오는 중 오류 발생:", error);
      }
    };

    fetchVoices();
  }, []);

  const filteredVoices =
    filter === "전체"
      ? voices
      : filter === "나의 소리"
      ? voices.filter(
          (voice) => voice.voiceState === null || voice.voiceState === "미처리"
        )
      : voices.filter((voice) => voice.voiceState === "처리완료");

  return (
    <div className="voice-container">
      <h2>고객의 소리 리스트</h2>
      <div className="filter-buttons">
        <Button
          className={filter === "전체" ? "active" : ""}
          onClick={() => setFilter("전체")}
        >
          전체
        </Button>
        <Button
          className={filter === "나의 소리" ? "active" : ""}
          onClick={() => setFilter("나의 소리")}
        >
          신규
        </Button>
        <Button
          className={filter === "답변 확인" ? "active" : ""}
          onClick={() => setFilter("답변 확인")}
        >
          완료
        </Button>
      </div>
      <div className="voice-list">
        {filteredVoices.map((voice) => (
          <VoiceItem key={voice.voiceId} voice={voice} />
        ))}
      </div>
    </div>
  );
};

export default VoiceList;
