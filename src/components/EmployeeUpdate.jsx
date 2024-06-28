import React, { useState } from 'react';
import '../styles/Employee.css';

const EmployeeUpdate = () => {
  const initialFormData = {
    직원ID: '',
    이름: '',
    비밀ID: '',
    부서코드: '',
    직책: '',
    입사일: '',
    이메일: '',
    핸드폰: '',
    주소: '',
    재직상태: ''
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEmployee = () => {
    alert("수정 버튼이 클릭되었습니다.");
    // 수정 로직을 여기에 구현하세요
    // 예를 들어, 서버로 수정된 formData를 전송하거나 다른 처리를 수행할 수 있습니다.
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setFormData(initialFormData); // 폼 데이터 초기화
    }
  };

  const deleteEmployee = () => {
    if (window.confirm("정말로 이 직원을 삭제하시겠습니까?")) {
      // 삭제 로직을 여기에 구현하세요
      alert("직원이 삭제되었습니다.");
      // 예를 들어, 서버에서 해당 직원 데이터를 삭제하고, 리스트에서 제거하는 등의 작업을 수행할 수 있습니다.
    }
  };

  return (
    <form id="employeeform">
      {Object.keys(formData).map((key) => (
        <React.Fragment key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type={key === '비밀ID' ? 'password' : 'text'}  // '비밀ID' 키일 경우 비밀번호 입력으로 처리
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

export default EmployeeUpdate;