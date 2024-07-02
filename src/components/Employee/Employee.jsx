import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Employee.css';

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

  const location = useLocation();
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  // 컴포넌트가 처음 마운트될 때 location.state.employee에 값이 있는지 확인 후 formData 설정
  useState(() => {
    if (location.state && location.state.employee) {
      setFormData(location.state.employee);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEmployee  = () => {
    alert("직원 정보가 수정되었습니다.");
    // 등록 로직을 여기에 구현하세요

    // 등록 후 페이지 이동
    navigate('/employee-list'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setFormData(initialFormData); // 폼 데이터 초기화
      // 취소 후 페이지 이동
      navigate('/employee-list'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
    }else{
      // 취소를 누르면 Alert 창이 종료됩니다.  
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
      </div>
    </form>
  );
}

export default Employee;
