import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Employee.css';

const Quitter = () => {
  const initialFormData = {
    퇴사자ID: '',
    이름: '',
    부서코드: '',
    직책: '',
    이메일: '',
    핸드폰: '',
    주소: '',
    입사일: '',
    퇴사일: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = () => {
    alert("등록 버튼이 클릭되었습니다.");
    // 등록 로직을 여기에 구현하세요

    // 등록 후 페이지 이동
    navigate('/quitter-list'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
  };

  const confirmCancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigate('/quitter-list'); // 확인을 누르면 '/quitterlist' 페이지로 이동
    } else {
      // 취소를 누르면 아무 동작 없음
    }
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setFormData(initialFormData); // 폼 데이터 초기화
    }
  };

  return (
    <form id="Quitterform">
      {Object.keys(formData).map((key) => (
        <React.Fragment key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="text"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </React.Fragment>
      ))}
      <div className="buttons">
        <button type="button" onClick={register}>등록</button>
        <button type="button" onClick={confirmCancel}>취소</button>
      </div>
    </form>
  );
}

export default Quitter;
