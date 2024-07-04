import React, { useState } from "react";
import axios from "axios";
import Button from "../Button"; // Button 컴포넌트 import 경로
import VoiceAnswer from "./VoiceAnswer"; // VoiceAnswer 컴포넌트 import 경로
import "../../styles/VoiceItem.css";

const VoiceItem = ({ voice }) => {
  const [expanded, setExpanded] = useState(false); // 상세 정보 표시 여부를 관리하는 상태
  const [mouseOver, setMouseOver] = useState(false); // 마우스 오버 상태를 관리하는 상태
  const [showAnswerForm, setShowAnswerForm] = useState(false); // 답변 창 표시 여부를 관리하는 상태

  const toggleExpand = () => {
    if (!showAnswerForm) {
      setExpanded(!expanded); // 클릭 시 상태를 반전시킴
    }
  };

  const handleMouseEnter = () => {
    if (!showAnswerForm) {
      setMouseOver(true); // 마우스 오버 시 상세 정보를 표시
    }
  };

  const handleMouseLeave = () => {
    if (!showAnswerForm) {
      setMouseOver(false); // 마우스 떠날 시 상세 정보 숨김
    }
  };

  const getStatusColor = () => {
    if (voice.voiceState === null || voice.voiceState === undefined) {
      return "red"; // 처리 여부가 null이면 빨간색
    } else {
      return voice.voiceState === "미처리" ? "red" : "green";
    }
  };

  const handleReply = () => {
    // 답변 창 열기
    setShowAnswerForm(true);
  };

  const handleCloseAnswerForm = () => {
    // 답변 창 닫기
    setShowAnswerForm(false);
  };

  const handleAnswerSubmitted = (answerData) => {
    // 답변 등록 후 처리
    console.log("답변이 등록되었습니다:", answerData);

    // 답변 등록 후 상세 정보 보기 유지
    setExpanded(true);
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
              <strong>번호:</strong> {voice.voiceId}
            </td>
            <td></td>
            <td>
              <strong>처리여부:</strong>{" "}
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
                <td>{voice.customer.custId}</td>

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
                <td>{voice.voiceTitle}</td>
              </tr>
              <tr>
                <td>
                  <strong>내용:</strong>
                </td>
                <td>{voice.voiceContent}</td>
              </tr>
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  {!showAnswerForm && (
                    <Button onClick={handleReply}>답변 등록</Button>
                  )}
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {/* 답변 창 */}
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
