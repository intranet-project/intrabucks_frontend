import React, { useState } from "react";
import axios from "axios";
import Button from "../Button"; // Button 컴포넌트 import 경로

const VoiceAnswer = ({ voiceId, onClose, onAnswerSubmitted }) => {
  const [answerContent, setAnswerContent] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 서버에 등록 요청 보내기
      const response = await axios.post(
        "http://localhost:9000/api/v1/intrabucks/customer/answer",
        {
          voiceId: voiceId,
          answerContent: answerContent,
          employeeId: employeeId,
        }
      );
      console.log(voiceId, answerContent, employeeId);
      console.log("답변이 성공적으로 등록되었습니다:", response.data);

      // 폼 초기화
      setAnswerContent("");
      setEmployeeId("");

      // 부모 컴포넌트로 등록 완료를 알리기
      onAnswerSubmitted(response.data); // 서버에서 반환된 데이터 전달

      // 답변 등록 후 창 닫기
      onClose();
    } catch (error) {
      console.error("답변 등록 중 오류 발생:", error);
      // 등록 실패 시 사용자에게 알림을 주는 로직 추가
      // 예: 오류 메시지 출력 등
    }
  };

  const handleClose = () => {
    onClose(); // 닫기 버튼 클릭 시 창 닫기
  };

  return (
    <div className="voice-answer">
      <h2>답변 등록 - 번호: {voiceId}</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="답변 내용을 입력하세요..."
        value={answerContent}
        onChange={(e) => setAnswerContent(e.target.value)}
      ></textarea>
      <br />
      <label>
        직원 ID:
        <input
          type="number"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
      </label>
      <br />
      <Button onClick={handleSubmit}>등록</Button>
      <Button onClick={handleClose}>닫기</Button>
    </div>
  );
};

export default VoiceAnswer;
