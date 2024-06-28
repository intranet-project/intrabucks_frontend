import React, { useState } from 'react';
import '../styles/Employee.css';

const Employee = () => {
  const initialFormData = {
    직원ID: '',
    이름: '',
    비밀ID: '',
    부서코드: '',
    직책: '',
    이메일: '',
    핸드폰: '',
    주소: '',
    입사일: '',
    재직상태: ''
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
    <form id="employeeform">
      {Object.keys(formData).map((key) => (
        <React.Fragment key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type={key === 'password' ? 'password' : 'text'}  // '비밀ID' 키일 경우 비밀번호 입력으로 처리
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

export default Employee;