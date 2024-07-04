import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // axios import 추가 필요
import '../../styles/Employee.css';

const Department = () => {
  const initialFormData = {
    deptId: '', // 수정: 부서ID의 name 속성을 'deptId'로 변경
    deptCode: '', // 수정: 부서코드의 name 속성을 'deptCode'로 변경
    deptName: '' // 수정: 부서명의 name 속성을 'deptName'으로 변경
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const register = async () => { // async 함수로 변경
    try {
      const response = await axios.post('http://localhost:9000/api/department/create', formData);
      console.log('Response from server:', response.data);
      alert("등록이 완료되었습니다..");
      navigate('/department');
    } catch (error) {
      console.error('Error creating department:', error);
      alert('입력 정보를 확인하세요.');
    }
  };

  return (
    <div className="employee-form-container">
      <h2>부서 등록</h2>
      <form id="department-form">
        <div className="form-group">
          <label htmlFor="deptId">부서ID</label>
          <input
            type="text"
            id="deptId"
            name="deptId" // 수정: name 속성을 'deptId'로 변경
            readOnly
            value={formData['deptId']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deptCode">부서코드</label>
          <input
            type="text"
            id="deptCode"
            name="deptCode" // 수정: name 속성을 'deptCode'로 변경
            value={formData['deptCode']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deptName">부서명</label>
          <input
            type="text"
            id="deptName"
            name="deptName" // 수정: name 속성을 'deptName'으로 변경
            value={formData['deptName']}
            onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={register}>등록</button>
        </div>
      </form>
    </div>
  );
};

export default Department;
