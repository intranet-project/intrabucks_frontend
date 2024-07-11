import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuitterList = () => {
  const navigate = useNavigate();
  const [quitters, setQuitters] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수를 상태로 관리
  const [pageSize] = useState(10); // 페이지당 문서 수

  useEffect(() => {
    fetchQuittersFromApi(page);
  }, [page]);

  const fetchQuittersFromApi = async (pageNumber) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const { content, totalPages } = response.data; // 서버에서 전달된 내용과 전체 페이지 수 추출
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/quitter/select?page=${pageNumber}&size=${pageSize}`, {
        headers: {
            'Authorization': token
        }
    });
      console.log(response.data); // 데이터 확인용
      setQuitters(content);
      setTotalPages(totalPages); // 전체 페이지 수 업데이트
    } catch (error) {
      console.error('Error fetching quitters:', error);
    }
  };

  const handleNameClick = (quitter) => {
    console.log('선택한 퇴사자 정보:', quitter);
    // 선택한 퇴사자 정보를 QuitterUpdate 페이지로 전달하고 이동
    navigate('/quitter-update', { state: { quitter } });
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // 페이지 변경 시 페이지 상태 업데이트
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
      <div className="pagination">
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
          이전
        </button>
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={pageNumber === page}
          >
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

export default QuitterList;
