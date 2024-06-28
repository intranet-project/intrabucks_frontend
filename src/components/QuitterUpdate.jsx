import React, { useState } from 'react';
import '../styles/Employee.css';

const QuitterUpdate = () => {
  const initialFormData = {
    퇴사자ID: '',
    이름: '',
    부서코드: '',
    직책: '',
    입사일: '',
    이메일: '',
    핸드폰: '',
    주소: '',
    퇴사일: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEmployee = () => {
    alert("수정 버튼이 클릭되었습니다.");
    // 수정 로직을 여기에 구현하세요
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setFormData(initialFormData); // 폼 데이터 초기화
    }
  };

  const deleteEmployee = () => {
    if (window.confirm("정말로 이 직원을 삭제하시겠습니까?")) {
      alert("직원이 삭제되었습니다.");
      // 삭제 로직을 여기에 구현하세요
    }
  };

  return (
    <form id="employeeform">
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
        <button type="button" onClick={updateEmployee}>수정</button>
        <button type="button" onClick={cancel}>취소</button>
        <button type="button" onClick={deleteEmployee}>삭제</button>
      </div>
    </form>
  );
}

export default QuitterUpdate;