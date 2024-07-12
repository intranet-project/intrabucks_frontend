import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/BoardList.css';

const BoardList = () => {
  const navigate = useNavigate();

  /* API 게시판 목록 조회 */
  const [boards, setBoards] = useState({
    boardId: "",
    boardTitle: "",
    boardContent: "",
    employee: {
          empId: null,
          empName: "",
          empPassword: "",
          empEmail: "",
          empPhone: "",
          empAddress: "",
          empJoinDate: "",
          empPosition: "",
          department: {
            deptCode: "",
          },
          workState: "",
        },
    boardDate: "",
    boardFile: "",
    department: {
            deptCode: "",
            deptName:"",
          },
    });
  const fetchBoards = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      if (!token) {
        console.error('토큰이 없습니다. 로그인 상태를 확인하세요.');
        return;
      }
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/board/selectBoardList`, {
        headers: {
          'Authorization': token
        }
      });
      console.error(response.data);
      setBoards(response.data);
    } catch (error) {
      console.error('게시판 목록을 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const handleTitleClick = (boardId) => {
    navigate(`/board-update/${boardId}`);
  };

  const handleNewBoardClick = () => {
    navigate('/board');
  };

  const handleupBoardClick = () => {
    navigate('/boardUpdate');
  };

  return (
    <div className="board-list-container">
      <h2>게시판 목록</h2>
      
      <div className="table-wrapper">
        <table className="board-list">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              
              <th>등록일</th>
              <th>첨부파일</th>
              
            </tr>
          </thead>
          <tbody>
            {boards && boards.length > 0 ? (
              boards.map(board => (
                <tr key={board.boardId}>
                  <td>{board.boardId}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleTitleClick(board.boardId)}>{board.boardTitle}</td>
                  <td>{board.boardContent}</td>
                
                  <td>{board.boardDate}</td>
                  <td>{board.boardFile}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>게시글이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button onClick={handleNewBoardClick}>신규등록</button>
      
    </div>
  );
};

export default BoardList;
