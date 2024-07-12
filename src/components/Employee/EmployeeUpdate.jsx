import React, { useState, useEffect } from 'react';
import '../../styles/Employee.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeUpdate = () => {
  const initialFormData = {
    직원ID: '',
    이름: '',
    비밀번호: '',
    부서코드: '',
    직책: '',
    입사일: '',
    이메일: '',
    핸드폰: '',
    주소: '',
    재직상태: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const { empId } = useParams(); // URL 파라미터에서 직원 ID 가져오기

  useEffect(() => {
    fetchEmployeeData(empId);
  }, [empId]);

  const fetchEmployeeData = async (id) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/employee/${empId}`, {
        headers: {
          'Authorization': token
      }
      });
      if (response.data) {
        setFormData(response.data);
      } else {
        console.error('직원 정보를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('직원 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEmployee = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/employee/update/${empId}`, formData, {
        headers: {
          'Authorization': token
      }
      });
      if (response.data) {
        alert('직원 정보가 수정되었습니다.');
        navigate('/employee-list');
      } else {
        alert('직원 정보 수정에 실패하였습니다.');
      }
    } catch (error) {
      console.error('직원 정보 수정 중 오류 발생:', error);
      alert('직원 정보 수정 중 오류가 발생하였습니다.');
    }
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigate('/employee-list');
    }
  };

  const deleteEmployee = async () => {
    const token = sessionStorage.getItem('jwt');
    if (window.confirm("정말로 이 직원을 퇴사등록하시겠습니까? 직원정보가 삭제됩니다.")) {
      try {
        // 직원 삭제 API 요청

        await axios.delete(`http://localhost:9000/api/v1/intrabucks/employee/delete/${empId}`, 
          {headers: {
          'Authorization': token
      }
      });
        alert('직원이 퇴사 등록되었습니다.');
        // 삭제 후 퇴사자 목록 페이지로 이동
        navigate('/quitter-list');
      } catch (error) {
        console.error('직원 퇴사 등록 중 오류 발생:', error);
        alert('직원 퇴사 등록 중 오류가 발생하였습니다.');
      }
    }
  };

  return (
    <div className="employee-form-container">
      <h2 style={{ textAlign: 'center' }}>직원정보수정</h2>
      <form id="employee-form">
        <div className="form-group">
          <label htmlFor="empId">직원ID</label>
          <input
            type="text"
            id="empId"
            name="empId"
            readOnly
            value={formData['empId']}
            onChange={handleChange}
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
          <label htmlFor="empPassword">비밀번호</label>
          <input
            type="text"
            id="empPassword"
            name="empPassword"
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
        <button type="button" onClick={updateEmployee}>수정</button>
        <button type="button" onClick={cancel}>취소</button>
        <button type="button" onClick={deleteEmployee}>퇴사등록</button>
      </div>
    </form>
    </div>
  );
};

export default EmployeeUpdate;
