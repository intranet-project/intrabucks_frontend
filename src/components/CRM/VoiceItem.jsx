import React, { useState } from "react";
import Button from "../Button";
import VoiceAnswer from "./VoiceAnswer";
import "../../styles/VoiceItem.css";

const VoiceItem = ({ voice, onAnswerSubmitted }) => {
  const [expanded, setExpanded] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const toggleExpand = () => {
    if (!showAnswerForm) {
      setExpanded(!expanded);
    }
  };

  const handleMouseEnter = () => {
    if (!showAnswerForm) {
      setMouseOver(true);
    }
  };

  const handleMouseLeave = () => {
    if (!showAnswerForm) {
      setMouseOver(false);
    }
  };

  const getStatusColor = () => {
    if (voice.voiceState === null || voice.voiceState === undefined) {
      return "red";
    } else {
      return voice.voiceState === "미처리" ? "red" : "green";
    }
  };

  const handleReply = (e) => {
    e.stopPropagation(); // Prevent the toggleExpand from being called
    setShowAnswerForm(true);
  };

  const handleCloseAnswerForm = () => {
    setShowAnswerForm(false);
  };

  const handleAnswerSubmitted = (updatedVoice) => {
    console.log("답변이 등록되었습니다:", updatedVoice);
    setShowAnswerForm(false);
    onAnswerSubmitted(updatedVoice); // 부모 컴포넌트로 상태 변경 알림
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleString("ko-KR", options);
  };

  return (
    <div
      className={`voice-item ${showAnswerForm ? "voice-item-fixed" : ""}`}
      onClick={toggleExpand}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <table>
        <tbody>
          <tr>
            <td>
              접수 번호 : <strong>{voice.voiceId}</strong>
            </td>
            <td>
              매장: <strong>{voice.store.storeName}</strong>
            </td>
            <td>
              <span style={{ color: getStatusColor() }}>
                {voice.voiceState || "미처리"}
              </span>
            </td>
          </tr>
          {(expanded || mouseOver) && (
            <>
              <tr>
                <td>
                  고객 ID : <strong>{voice.customer?.custId} </strong>
                </td>
                <td>
                  고객명 :<strong>{voice.customer?.custName} </strong>
                </td>
                <td>
                  생성 날짜 :
                  {voice.voiceDate
                    ? formatDate(voice.voiceDate)
                    : "날짜 정보 없음"}
                </td>
              </tr>
              <br />
              <tr>
                <td colSpan="4">
                  제목 : <strong> {voice.voiceTitle}</strong>
                </td>
              </tr>
              <tr>
                <td colSpan="4">
                  내용 : <strong> {voice.voiceContent}</strong>
                </td>
              </tr>
              {voice.voiceState === "처리완료" && (
                <>
                  <br />
                  <tr>
                    <td colSpan="4">
                      답변 내용 : <strong>{voice.answerContent}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2"></td>
                    <td colSpan="2">
                      처리일자 : {formatDate(voice.answerDate)}
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {!showAnswerForm &&
                    (voice.voiceState === null ||
                      voice.voiceState === "미처리") && (
                      <Button onClick={handleReply}>답변 등록</Button>
                    )}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {showAnswerForm && (
        <VoiceAnswer
          voiceId={voice.voiceId}
          onClose={handleCloseAnswerForm}
          onAnswerSubmitted={handleAnswerSubmitted}
        />
      )}
    </div>
  );
};

export default VoiceItem;
