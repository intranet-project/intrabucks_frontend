import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Board.css';

const Board = () => {
  const initialFormData = {
    boardId: '',
    deptId: '', // 부서 선택
    empEmail: '',
    boardTitle: '',
    boardContent: '',
    boardDate: '',
    boardFile: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*API직원등록*/
  const createBoard = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.post('http://localhost:9000/api/v1/intrabucks/board/createBoard', formData, {
        headers: {
          'Authorization': token
      }
      });
      console.log('Response from server:', response.data);
      alert('직원 정보가 등록되었습니다.');
      navigate('/BoardList');
    } catch (error) {
      console.error('Error creating board:', error);
      alert('부서 코드를 확인하세요.');
    }
  }; 

  const cancel = () => {
    if (window.confirm('취소하시겠습니까?')) {
      setFormData(initialFormData);
      navigate('/BoardList');
    }
  };

  return (
    <div className="board-form-container">
      <form id="board-form">
        <div className="form-group" >
          <label htmlFor="boardId">문서번호</label>
          <input
            type="text"
            id="boardId"
            name="boardId"
            readOnly
            value={formData['boardId']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deptId">부서코드</label>
          <input
            type="text"
            id="deptId"  
            name="deptId"
            value={formData['deptId']}
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
            required
            style={{ display: 'flex', padding: '1rem', height: '2.3rem'}}  
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
          <label htmlFor="boardPassword">내용</label>
          <textarea
            type="boardContent"
            id="boardContent"
            name="boardContent"
            value={formData['boardContent']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardDate">작성일</label>
          <input
            type="date"
            id="boardDate"
            name="boardDate"
            value={formData['boardDate']}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardDate">첨부파일</label>
          <input
            type="file"
            id="boardFile"
            name="boardFile"
            value={formData['boardFile']}
            onChange={handleChange}
          />
        </div>

        
        <div className="buttons">
          <button type="button" onClick={createBoard}>
            등록
          </button>
          <button type="button" onClick={cancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Board;
