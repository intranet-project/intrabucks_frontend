import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Employee.css';

const Employee = () => {
  const initialFormData = {
    empId: '',
    empName: '',
    empPassword: '',
    deptCode: '', // 이 부분은 사용자가 선택할 부서 코드입니다.
    empPosition: '',
    empEmail: '',
    empPhone: '',
    empAddress: '',
    empJoinDate: '',
    workState: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*API직원등록*/
  const createEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/v1/intrabucks/employee/create', formData);
      console.log('Response from server:', response.data);
      alert('직원 정보가 등록되었습니다.');
      navigate('/employee-list');
    } catch (error) {
      console.error('Error creating employee:', error);
      alert('부서 코드를 확인하세요.');
    }
  }; 

  const cancel = () => {
    if (window.confirm('취소하시겠습니까?')) {
      setFormData(initialFormData);
      navigate('/employee-list');
    }
  };

  return (
    <div className="employee-form-container">
      <h2>직원 등록</h2>
      <form id="employee-form">
        <div className="form-group" style={{display:'flex'}}>
          <label htmlFor="empId">직원ID</label>
          <input
            type="text"
            id="empId"
            name="empId"
            readOnly
            value={formData['empId']}
            onChange={handleChange}
            style={{width:'80%', marginLeft:'40px'}}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empName">이름</label>
          <input
            type="text"
            id="empName"
            name="empName"
            value={formData['empName']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empPassword">비밀ID</label>
          <input
            type="text"
            id="empPassword"
            name="empPassword"
            value={formData['empPassword']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deptCode">부서코드</label>
          <input
            type="text"
            id="deptCode"  
            name="deptCode"
            value={formData['deptCode']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empPosition">직책</label>
          <input
            type="text"
            id="empPosition"
            name="empPosition"
            value={formData['empPosition']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empEmail">이메일</label>
          <input
            type="email"
            id="empEmail"
            name="empEmail"
            value={formData['empEmail']}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="empPhone">핸드폰</label>
          <input
            type="text"
            id="empPhone"
            name="empPhone"
            value={formData['empPhone']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empAddress">주소</label>
          <input
            type="text"
            id="empAddress"
            name="empAddress"
            value={formData['empAddress']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empJoinDate">입사일</label>
          <input
            type="date"
            id="empJoinDate"
            name="empJoinDate"
            value={formData['empJoinDate']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="workState">재직상태</label>
          <input
            type="text"
            id="workState"
            name="workState"
            value={formData['workState']}
            onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={createEmployee}>
            등록
          </button>
          <button type="button" onClick={cancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Employee;
