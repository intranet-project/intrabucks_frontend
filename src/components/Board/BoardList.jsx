import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/BoardList.css';

const BoardList = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // 임시로 데이터 생성
    const dummyBoards = [
      {
        boardId: 1,
        boardTitle: '업무 보고서',
        boardContent: '업무 보고서 내용입니다.',
        employee: {
          empEmail: 'employee1@example.com'
        },
        boardDate: '2024-07-09',
        boardFile: 'report.pdf',
        department: {
          deptId: 1,
          deptName: 'EB' // EB 부서
        }
      },
      {
        boardId: 2,
        boardTitle: '회의록',
        boardContent: '회의록 내용입니다.',
        employee: {
          empEmail: 'employee2@example.com'
        },
        boardDate: '2024-07-10',
        boardFile: 'minutes.docx',
        department: {
          deptId: 2,
          deptName: 'MS' // MS 부서
        }
      },
      {
        boardId: 3,
        boardTitle: '공지사항',
        boardContent: '공지사항 내용입니다.',
        employee: {
          empEmail: 'employee3@example.com'
        },
        boardDate: '2024-07-11',
        boardFile: 'announcement.pdf',
        department: {
          deptId: 3,
          deptName: 'GA' // GA 부서
        }
      },
      {
        boardId: 4,
        boardTitle: '업무 안내',
        boardContent: '업무 안내 내용입니다.',
        employee: {
          empEmail: 'employee4@example.com'
        },
        boardDate: '2024-07-12',
        boardFile: 'guidance.doc',
        department: {
          deptId: 4,
          deptName: 'PD' // PD 부서
        }
      },
      {
        boardId: 5,
        boardTitle: '인사 관련 공지',
        boardContent: '인사 관련 공지사항 내용입니다.',
        employee: {
          empEmail: 'employee5@example.com'
        },
        boardDate: '2024-07-13',
        boardFile: 'hr_notice.pdf',
        department: {
          deptId: 5,
          deptName: 'HR' // HR 부서
        }
      },
      {
        boardId: 6,
        boardTitle: '재무 보고서',
        boardContent: '재무 보고서 내용입니다.',
        employee: {
          empEmail: 'employee6@example.com'
        },
        boardDate: '2024-07-14',
        boardFile: 'financial_report.xls',
        department: {
          deptId: 6,
          deptName: 'FD' // FD 부서
        }
      },
      {
        boardId: 7,
        boardTitle: '프로젝트 진행 상황',
        boardContent: '프로젝트 진행 상황 보고서입니다.',
        employee: {
          empEmail: 'employee7@example.com'
        },
        boardDate: '2024-07-15',
        boardFile: 'project_status.docx',
        department: {
          deptId: 7,
          deptName: 'DM' // DM 부서
        }
      },
      {
        boardId: 8,
        boardTitle: '사내 이벤트 공지',
        boardContent: '사내 이벤트 공지사항입니다.',
        employee: {
          empEmail: 'employee8@example.com'
        },
        boardDate: '2024-07-16',
        boardFile: 'event_notice.pdf',
        department: {
          deptId: 8,
          deptName: 'LO' // LO 부서
        }
      },
      {
        boardId: 9,
        boardTitle: '연구 개발 논문',
        boardContent: '연구 개발 관련 논문입니다.',
        employee: {
          empEmail: 'employee9@example.com'
        },
        boardDate: '2024-07-17',
        boardFile: 'research_paper.pdf',
        department: {
          deptId: 9,
          deptName: 'RD' // RD 부서
        }
      },
      {
        boardId: 10,
        boardTitle: '고객 서비스 업무 안내',
        boardContent: '고객 서비스 업무 안내사항입니다.',
        employee: {
          empEmail: 'employee10@example.com'
        },
        boardDate: '2024-07-18',
        boardFile: 'customer_service_info.doc',
        department: {
          deptId: 10,
          deptName: 'CS' // CS 부서
        }
      },
      {
        boardId: 11,
        boardTitle: '의료 기술 개발 보고서',
        boardContent: '의료 기술 개발 보고서입니다.',
        employee: {
          empEmail: 'employee11@example.com'
        },
        boardDate: '2024-07-19',
        boardFile: 'medical_tech_report.pdf',
        department: {
          deptId: 11,
          deptName: 'MD' // MD 부서
        }
      },
    ];

    setBoards(dummyBoards);
  }, []);


  /* API 게시판 목록 조회 */
  const fetchBoards = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/board/selectBoardList`, {
        headers: {
          'Authorization': token
        }
      });
      setBoards(response.data.content);
    } catch (error) {
      console.error('게시판 목록을 불러오는 중 오류가 발생했습니다:', error);
    }
  };

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
      <button >임원</button>
      <button >경영지원부서</button>
      <button >총무부</button>
      <button >구매부</button>
      <button >인사부</button>
      <button >재무부</button>
      <button >DM부</button>
      <button >물류부</button>
      <button >연구개발부</button>
      <button >고객지원부</button>
      <button >마케팅부</button>
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
            {boards && boards.length > 0 ? (
              boards.map(board => (
                <tr key={board.boardId}>
                  <td>{board.boardId}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleTitleClick(board.boardId)}>{board.boardTitle}</td>
                  <td>{board.boardContent}</td>
                  <td>{board.employee.empEmail}</td>
                  <td>{board.boardDate}</td>
                  <td>{board.boardFile}</td>
                  <td>{board.department.deptId}</td>
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
      <button onClick={handleupBoardClick}>수정</button>
    </div>
  );
};

export default BoardList;
