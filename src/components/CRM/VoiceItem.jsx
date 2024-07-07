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
              <strong>번호:</strong>
            </td>
            <td>{voice.voiceId}</td>
            <td>
              <strong>매장:</strong>
            </td>
            <td>{voice.store.storeId}</td> {/* 여기서 storeId를 표시 */}
            <td>
              <strong>처리여부:</strong>
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
                  <strong>고객 ID:</strong>
                </td>
                <td>{voice.customer?.custId}</td>
                <td>
                  <strong>생성 날짜:</strong>
                </td>
                <td>
                  {voice.voiceDate
                    ? new Date(voice.voiceDate).toLocaleDateString()
                    : "날짜 정보 없음"}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>제목:</strong>
                </td>
                <td colSpan="3">{voice.voiceTitle}</td>
              </tr>
              <tr>
                <td>
                  <strong>내용:</strong>
                </td>
                <td colSpan="3">{voice.voiceContent}</td>
              </tr>
              {voice.voiceState === "처리완료" && (
                <tr>
                  <td>
                    <strong>답변 내용:</strong>
                  </td>
                  <td colSpan="3">{voice.answerContent}</td>
                </tr>
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
