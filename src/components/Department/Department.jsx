import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Department = () => {
  const initialFormData = {
    부서ID: '',
    부서코드: '',
    부서명: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = () => {
    alert("등록 버튼이 클릭되었습니다.");
    // 등록 로직을 여기에 구현하세요
    navigate('/department-update'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setFormData(initialFormData); // 폼 데이터 초기화
      // 취소 후 페이지 이동
      navigate('/department'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
    }else{
      // 취소를 누르면 Alert 창이 종료됩니다.  
    }
  };

  return (
    <form id="departmentform">
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="text"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="buttons">
        <button type="button" onClick={register}>등록</button>
        <button type="button" onClick={cancel}>취소</button>
      </div>
    </form>
  );
};

export default Department;