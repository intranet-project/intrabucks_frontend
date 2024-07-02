import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/employee/create', formData);
      console.log('Response from server:', response.data);
      alert('직원 정보가 등록되었습니다.');
      // 등록 후 페이지 이동
      navigate('/employee-list'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('직원 정보 등록에 실패하였습니다.');
    }
  };

  const cancel = () => {
    if (window.confirm('취소하시겠습니까?')) {
      setFormData(initialFormData); // 폼 데이터 초기화
      // 취소 후 페이지 이동
      navigate('/employee-list'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
    }
  };

  return (
    <form id="employeeform">
      {Object.keys(formData).map((key) => (
        <React.Fragment key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type={key === '비밀ID' ? 'password' : 'text'} // '비밀ID' 키일 경우 비밀번호 입력으로 처리
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </React.Fragment>
      ))}
      <div className="buttons">
        <button type="button" onClick={createEmployee}>
          등록
        </button>
        <button type="button" onClick={cancel}>
          취소
        </button>
      </div>
    </form>
  );
};

export default Employee;
