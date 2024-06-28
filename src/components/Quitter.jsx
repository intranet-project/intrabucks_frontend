import React, { useState } from 'react';
import '../styles/Employee.css';

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = () => {
    alert("등록 버튼이 클릭되었습니다.");
    // 등록 로직을 여기에 구현하세요
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
        <button type="button" onClick={cancel}>취소</button>
      </div>
    </form>
  );
}

export default Quitter;