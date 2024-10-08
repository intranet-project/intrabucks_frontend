import React, { useState, useEffect } from "react";
import axios from "axios";
import VoiceItem from "./VoiceItem";
import "../../styles/VoiceList.css";
import Button from "../Button";

const VoiceList = () => {
  const [voices, setVoices] = useState([]);
  const [filter, setFilter] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const token = sessionStorage.getItem('jwt');
        const response = await axios.get(
          "http://localhost:9000/api/v1/intrabucks/customer/voice", { // 포트 번호 9000 명시,
            headers: {
              'Authorization': token
          }
          });
        const sortedVoices = response.data.sort(
          (a, b) => b.voiceId - a.voiceId
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div>
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
        <input
          type="text"
          placeholder="검색 (매장명, 고객명, 문의 내용)"
          value={searchQuery}
          onChange={handleSearch}
        />
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
