import React, { useEffect, useState } from 'react';
import CreateBoardModal from './CreateBoardModal';
import BoardDetailModal from './BoardDetailModal';
import axios from 'axios';

const BoardList = ({ boards }) => {
  const [modalAddBoardOpen, setModalAddBoardOpen] = useState(false);
  const [modalDetailBoardOpen, setModalDetailBoardOpen] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [data, setData] = useState(null);

  // 게시판 추가 모달창 열고 닫기
  const openAddBoardModal = () => {
    setModalAddBoardOpen(true);
  };

  const closeAddBoardModal = () => {
    setModalAddBoardOpen(false);
  };

  // 게시판 상세보기 모달창 열고 닫기
  const openDetailBoardModal = (boardId) => {
    setSelectedBoardId(boardId);
    setModalDetailBoardOpen(true);
  };

  const closeDetailBoardModal = () => {
    setModalDetailBoardOpen(false);
    setSelectedBoardId(null);
    setData(null); // Clear data when closing modal
  };

  const fetchData = async (boardId) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/board/selectOneBoard/${boardId}`, {
        headers: {
          'Authorization': token
        }
      });
      console.log('Fetched data:', response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when modal opens and selectedBoardId is set
  useEffect(() => {
    if (modalDetailBoardOpen && selectedBoardId !== null) {
      fetchData(selectedBoardId);
    }
  }, [modalDetailBoardOpen, selectedBoardId]);

  return (
    <div className="component-list-container">
      <h1>게시판 목록</h1>
      <button onClick={openAddBoardModal}>신규등록</button>
      <CreateBoardModal isOpen={modalAddBoardOpen} onClose={closeAddBoardModal} />

      {boards && boards.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>등록일</th>
              <th>첨부파일</th>
              <th>상세보기</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board, index) => (
              <tr key={index}>
                <td>{board.boardId}</td>
                <td>{board.boardTitle}</td>
                <td>{board.boardContent}</td>
                <td>{board.boardDate}</td>
                <td>{board.boardFile}</td>
                <td>
                  <button onClick={() => openDetailBoardModal(board.boardId)}>
                    상세보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>데이터가 없습니다.</p>
      )}

      {modalDetailBoardOpen && (
        <BoardDetailModal
          detailData={data}
          isOpen={modalDetailBoardOpen}
          onClose={closeDetailBoardModal}
        />
      )}
    </div>
  );
};

export default BoardList;
