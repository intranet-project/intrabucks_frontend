import React, { useState, useEffect } from 'react';
import '../../styles/Employee.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
  const navigate = useNavigate();
  const { empId } = useParams(); // URL 파라미터에서 직원 ID 가져오기

  useEffect(() => {
    fetchEmployeeData(empId);
  }, [empId]);

  const fetchEmployeeData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/employee/${empId}`);
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
      const response = await axios.put(`http://localhost:9000/api/employee/update/${empId}`, formData);
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
    if (window.confirm("정말로 이 직원을 퇴사등록하시겠습니까? 직원정보가 삭제됩니다.")) {
      try {
        await axios.delete(`http://localhost:9000/api/employee/delete/${empId}`);
        alert('직원이 퇴사 등록되었습니다.');
        navigate('/employee-list');
      } catch (error) {
        console.error('직원 퇴사 등록 중 오류 발생:', error);
        alert('직원 퇴사 등록 중 오류가 발생하였습니다.');
      }
    }
  };

  return (
    <form id="employee-form">
      {Object.keys(formData).map((key) => (
        <div key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type={key === '비밀ID' ? 'password' : 'text'}
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
          />
        </div>
      ))}
      <div className="buttons">
        <button type="button" onClick={updateEmployee}>수정</button>
        <button type="button" onClick={cancel}>취소</button>
        <button type="button" onClick={deleteEmployee}>퇴사등록</button>
      </div>
    </form>
  );
};

export default EmployeeUpdate;
