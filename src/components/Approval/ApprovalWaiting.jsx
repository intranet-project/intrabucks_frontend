import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/ApprovalBox.css'; 



function ApprovalWaiting() {
  const [approvalDocuments, setApprovalDocuments] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수를 상태로 관리
  const [pageSize] = useState(10); // 페이지당 문서 수

  const navigate = useNavigate();

  useEffect(() => {
    fetchApprovalDocuments(page); // 페이지가 변경될 때마다 문서 목록을 가져옴
}, [page]); // 페이지가 변경될 때 useEffect가 호출되도록 설정

    /* API 문서 전체 목록 조회 */
    const fetchApprovalDocuments = async (pageNumber) => {
      try {
          const response = await axios.get(`http://localhost:9000/api/Approval1/select?page=${pageNumber}&size=${pageSize}`);
          const { content, totalPages } = response.data; // 서버에서 전달된 내용과 전체 페이지 수 추출
          setApprovalDocuments(content); // 문서 목록 업데이트
          setTotalPages(totalPages); // 전체 페이지 수 업데이트
      } catch (error) {
          console.error('Error fetching approvalDocuments:', error);
      }
  };

    const handleDocumentClick = (docId) => {
        navigate(`/ApprovalUpdate/${docId}`);
    };

    const handlePageChange = (pageNumber) => {
      setPage(pageNumber); // 페이지 변경 시 페이지 상태 업데이트
  };

    return (
        <div className="approval-list-container">
          
      {/* 문서 목록과 페이징 */}
      <div className="approval-main-content"></div>
            <h2>결재 대기 문서</h2>
            <div className="table-wrapper">
                <table className="approval-list">
                    <thead>
                        <tr>
                            <th>문서번호</th>
                            <th>작성일</th>
                            <th>문서유형</th>                            
                            <th>제목</th>
                            <th>작성자</th>
                            <th>상태</th>
                            <th>부서</th>
                        </tr>
                    </thead>
                    <tbody>
                    {approvalDocuments.map(document => (
                        <tr key={document.appDocId}>
                            <td>{document.appDocId}</td>
                            <td>{document.appDocCreatedAt}</td>
                            <td>{document.docTypeId.documentTypeName}</td> {/* 문서 유형의 이름 필드 */}
                            <td style={{ cursor: 'pointer' }} onClick={() => handleDocumentClick(document.appDocId)}>
                                {document.appDocTitle}
                            </td>
                            <td>{document.empId.empName}</td> {/* 기안자의 이름 필드 */}
                            <td>{document.appDocStage}</td>
                            <td>{document.appDocDepartment}</td>
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
}

export default ApprovalWaiting;
