import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Board.css';

const Board = () => {
  const initialFormData = {
    boardId: '',
    boardTitle: '',
    boardContent: '',
    empEmail: '',
    boardDate: '',
    boardFile: null,
    department: {
      deptCode: '',
      deptName: '',
    },
    employee: {
      empId: null,
      empName: '',
      empPassword: '',
      empEmail: '',
      empPhone: '',
      empAddress: '',
      empJoinDate: '',
      empPosition: '',
      department: {
        deptCode: '',
      },
      workState: '',
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'empEmail' || name === 'empName') {
      setFormData({
        ...formData,
        employee: {
          ...formData.employee,
          [name]: value,
        },
      });
    } else if (name === 'boardTitle' || name === 'boardContent' || name === 'boardDate' || name === 'boardFile') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (name === 'department') {
      setFormData({
        ...formData,
        department: {
          ...formData.department,
          deptName: value,
        },
      });
    }
  };

  const createBoard = async () => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.post('http://localhost:9000/api/v1/intrabucks/board/createBoard', formData, {
        headers: {
          'Authorization': token,
        },
      });
      console.log('Response from server:', response.data);
      alert('게시글이 등록되었습니다.');
      navigate('/BoardList');
    } catch (error) {
      console.error('Error creating board:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
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
        <div className="form-group">
          <label htmlFor="boardId">문서번호</label>
          <input
            type="text"
            id="boardId"
            name="boardId"
            readOnly
            value={formData.boardId}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="empEmail">이메일</label>
          <input
            type="email"
            id="empEmail"
            name="empEmail"
            value={formData.employee.empEmail}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="boardTitle">제목</label>
          <input
            type="text"
            id="boardTitle"
            name="boardTitle"
            value={formData.boardTitle}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardContent">내용</label>
          <textarea
            id="boardContent"
            name="boardContent"
            value={formData.boardContent}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardDate">작성일</label>
          <input
            type="date"
            id="boardDate"
            name="boardDate"
            value={formData.boardDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="boardFile">첨부파일</label>
          <input
            type="file"
            id="boardFile"
            name="boardFile"
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
