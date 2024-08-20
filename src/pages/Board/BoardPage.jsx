import React, { useState, useEffect } from 'react';
import BoardList from '../../components/Board/BoardList';
import axios from 'axios';

const BoardPage = () => {
  const [boards, setBoards] = useState(null);

  /* API 게시판 목록 조회 */
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const token = sessionStorage.getItem('jwt');
        if (!token) {
          console.error('토큰이 없습니다. 로그인 상태를 확인하세요.');
          return;
        }
        const response = await axios.get('http://localhost:9000/api/v1/intrabucks/board/selectBoardList', {
          headers: {
            'Authorization': token
          }
        });
        console.log(response.data);
        setBoards(response.data);
      } catch (error) {
        console.error('게시판 목록을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div>
      <BoardList boards={boards} />
    </div>
  );
};

export default BoardPage;
