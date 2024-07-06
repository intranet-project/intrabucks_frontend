import React, { useState } from "react";
import axios from "axios";
import Button from "../Button"; // Button 컴포넌트 import 경로

const VoiceAnswer = ({ voiceId, onClose, onAnswerSubmitted }) => {
  const [answerContent, setAnswerContent] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/intrabucks/customer/answer",
        {
          voiceId: voiceId,
          answerContent: answerContent,
          employee: 2,
        }
      );

      console.log(voiceId, answerContent, employeeId);
      console.log("답변이 성공적으로 등록되었습니다:", response.data);

      const updatedVoice = {
        voiceId: voiceId,
        answerContent: answerContent,
        voiceState: "처리완료",
      };

      setAnswerContent("");
      setEmployeeId("");

      onAnswerSubmitted(updatedVoice); // 변경된 데이터를 부모 컴포넌트로 전달

      onClose();
    } catch (error) {
      console.error("답변 등록 중 오류 발생:", error);
    }
  };

  const handleClose = () => {
    onClose();
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
