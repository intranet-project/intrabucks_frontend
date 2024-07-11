import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/BoardList.css';

const BoardList = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수를 상태로 관리
  const [pageSize] = useState(10); // 페이지당 게시물 수


  /* API 게시물 목록 조회 */
  const fetchBoards = async (pageNumber) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/board/selectBoardList`, {
        headers: {
          'Authorization': token
        }
      });
      const { content, totalPages } = response.data; // 서버에서 전달된 내용과 전체 페이지 수 추출
      setBoards(content); // 게시물 목록 업데이트
      setTotalPages(totalPages); // 전체 페이지 수 업데이트
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const handleTitleClick = (boardId) => {
    navigate(`/board-detail/${boardId}`);
  };

  const handleNewBoardClick = () => {
    navigate('/board');
  };

  const handleUpdateBoardClick = () => {
    navigate('/boardUpdate');
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // 페이지 변경 시 페이지 상태 업데이트
  };

  return (
    <div className="board-list-container">
        <button onClick={handleNewBoardClick}>경영지원부</button>
        <button onClick={handleNewBoardClick}>총무부</button>
        <button onClick={handleNewBoardClick}>구매부</button>
        <button onClick={handleNewBoardClick}>인사부</button>
        <button onClick={handleNewBoardClick}>재무부</button>
        <button onClick={handleNewBoardClick}>DM부</button>
        <button onClick={handleNewBoardClick}>물류부</button>
        <button onClick={handleNewBoardClick}>연구개발부</button>
        <button onClick={handleNewBoardClick}>고객지원부</button>
        <button onClick={handleNewBoardClick}>마케팅부</button>
      <div className="table-wrapper">
        <table className="board-list">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>등록일</th>
              <th>첨부파일</th>
              <th>부서명</th>
            </tr>
          </thead>
          <tbody>
            {boards.map(board => (
              <tr key={board.boardId}>
                <td>{board.boardId}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => handleTitleClick(board.boardId)}>{board.boardTitle}</td>
                <td>{board.boardContent}</td>
                <td>{board.employee}</td>
                <td>{board.boardDate}</td>
                <td>{board.boardFile}</td>
                <td>{board.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleNewBoardClick}>신규등록</button>
      <button onClick={handleUpdateBoardClick}>수정</button>
      <div className="pagination">
        <button>
          다음
        </button>
      </div>
    </div>
  );
};

export default BoardList;
