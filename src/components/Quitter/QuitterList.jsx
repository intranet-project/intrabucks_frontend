import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuitterList = () => {
  const navigate = useNavigate();
  const [quitters, setQuitters] = useState([]);

  useEffect(() => {
    fetchQuittersFromApi();
  }, []);

  const fetchQuittersFromApi = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/quitter/select');
      console.log(response.data); // 데이터 확인용
      setQuitters(response.data.content);
    } catch (error) {
      console.error('Error fetching quitters:', error);
    }
  };

  const handleNameClick = (quitter) => {
    console.log('선택한 퇴사자 정보:', quitter);
    // 선택한 퇴사자 정보를 QuitterUpdate 페이지로 전달하고 이동
    navigate('/quitter-update', { state: { quitter } });
  };

  return (
    <div className="employee-list-container">
      <h2>퇴사자 정보</h2>
      <div className="table-wrapper">
        <table className="employee-list">
          <thead>
            <tr>
              <th>퇴사자ID</th>
              <th>직원ID</th>
              <th>이름</th>
              <th>부서코드</th>
              <th>직책</th>
              <th>이메일</th>
              <th>핸드폰</th>
              <th>주소</th>
              <th>입사일</th>
              <th>퇴사일</th>
            </tr>
          </thead>
          <tbody>
            {quitters.map(quitter => (
              <tr key={quitter.quitId}>
                <td>{quitter.quitId}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => handleNameClick(quitter)}>{quitter.quitName}</td>
                <td>{quitter.empId}</td>
                <td>{quitter.deptCode}</td>
                <td>{quitter.quitPosition}</td>
                <td>{quitter.quitEmail}</td>
                <td>{quitter.quitPhone}</td>
                <td>{quitter.quitAddress}</td>
                <td>{quitter.quitJoindate}</td>
                <td>{quitter.quitLeavingdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuitterList;
