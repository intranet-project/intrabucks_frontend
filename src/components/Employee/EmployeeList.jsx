import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/employee/select');
      setEmployees(response.data.content);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleNameClick = (empId) => {
    navigate(`/employee-update/${empId}`);
  };

  const handleNewEmployeeClick = () => {
    navigate('/employee');
  };

  return (
    <div className="employee-list-container">
      <h2>직원 정보</h2>
      <div className="table-wrapper">
        <table className="employee-list">
          <thead>
            <tr>
              <th>직원ID</th>
              <th>이름</th>
              <th>비밀ID</th>
              <th>부서코드</th>
              <th>직책</th>
              <th>입사일</th>
              <th>이메일</th>
              <th>핸드폰</th>
              <th>주소</th>
              <th>재직상태</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.empId}>
                <td>{employee.empId}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => handleNameClick(employee.empId)}>{employee.empName}</td>
                <td>{employee.empPassword}</td>
                <td>{employee.deptCode}</td>
                <td>{employee.empPosition}</td>
                <td>{employee.empJoinDate}</td>
                <td>{employee.empEmail}</td>
                <td>{employee.empPhone}</td>
                <td>{employee.empAddress}</td>
                <td>{employee.workState}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleNewEmployeeClick}>신규등록</button>
    </div>
  );
};

export default EmployeeList;
