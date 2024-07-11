import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BoardUpdate = () => {
  const initialFormData = {
    boardId: '',
    boardTitle: '',
    boardContent: '',
    empEmail: '',
    deptId: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const { boardId } = useParams(); // URL 파라미터에서 게시판 ID 가져오기

  useEffect(() => {
    fetchBoardData(boardId);
  }, [boardId]);

  const fetchBoardData = async (id) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/board/selectOneBoard/${boardId}`, {
        headers: {
          'Authorization': token
        }
      });
      if (response.data) {
        setFormData(response.data);
      } else {
        console.error('게시판 정보를 가져오지 못했습니다.');
      }
    } catch (error) {
      console.error('게시판 정보를 가져오는 중 오류 발생:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateBoard = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/board/updateBoard/${boardId}`, formData, {
        headers: {
          'Authorization': token
        }
      });
      if (response.data) {
        alert('게시판 정보가 수정되었습니다.');
        navigate('/board-list');
      } else {
        alert('게시판 정보 수정에 실패하였습니다.');
      }
    } catch (error) {
      console.error('게시판 정보 수정 중 오류 발생:', error);
      alert('게시판 정보 수정 중 오류가 발생하였습니다.');
    }
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      navigate('/board-list');
    }
  };

  const deleteBoard = async () => {
    if (window.confirm("정말로 이 게시판을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`http://localhost:9000/api/v1/intrabucks/board/deleteBoard/${boardId}`);
        alert('게시판이 삭제되었습니다.');
        navigate('/board-list');
      } catch (error) {
        console.error('게시판 삭제 중 오류 발생:', error);
        alert('게시판 삭제 중 오류가 발생하였습니다.');
      }
    }
  };

  return (
    <div className="board-form-container">
      <h2>게시판 수정</h2>
      <form id="board-form">
        <div className="form-group">
          <label htmlFor="boardId">문서번호</label>
          <input
            type="text"
            id="boardId"
            name="boardId"
            //readOnly
            value={formData['boardId']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deptId">부서명</label>
          <input
            type="text"
            id="deptId"
            name="deptId"
            value={formData['deptId']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardTitle">제목</label>
          <input
            type="text"
            id="boardTitle"
            name="boardTitle"
            value={formData['boardTitle']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardContent">내용</label>
          <textarea
            id="boardContent"
            name="boardContent"
            value={formData['boardContent']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="empEmail">이메일</label>
          <input
            type="email"
            id="empEmail"
            name="empEmail"
            value={formData['empEmail']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardDate">부서명</label>
          <input
            type="Date"
            id="boardDate"
            name="boardDate"
            value={formData['boardDate']}
            onChange={handleChange}
          />
        </div>

        <div className="buttons">
          <button type="button" onClick={updateBoard}>수정</button>
          <button type="button" onClick={cancel}>취소</button>
          <button type="button" onClick={deleteBoard}>삭제</button>
        </div>
      </form>
    </div>
  );
};

export default BoardUpdate;
