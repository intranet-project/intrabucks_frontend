import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/EmployeeList.css';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [approvalDocuments, setApprovalDocuments] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수를 상태로 관리
  const [pageSize] = useState(10); // 페이지당 문서 수


  useEffect(() => {
    fetchEmployees(page);
  }, [page]);

  /*API직원목록조회*/
  const fetchEmployees = async (pageNumber) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/employee/select?page=${pageNumber}&size=${pageSize}`, {
        headers: {
          'Authorization': token
      }
      });
      setEmployees(response.data.content);
      const { content, totalPages } = response.data; // 서버에서 전달된 내용과 전체 페이지 수 추출
      setApprovalDocuments(content); // 문서 목록 업데이트
      setTotalPages(totalPages); // 전체 페이지 수 업데이트
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
  
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // 페이지 변경 시 페이지 상태 업데이트
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
                <td>********</td>
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
      <div className="pagination">
              
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                    이전
                </button>
                {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                    <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                        {pageNumber + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                    다음
                </button>
            </div>

    </div>
  );
};

export default EmployeeList;
