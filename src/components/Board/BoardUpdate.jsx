import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Board.css';

const BoardUpdate = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const initialFormData = {
    boardId: '',
    deptCode: '',
    empEmail: '',
    boardTitle: '',
    boardContent: '',
    boardDate: '',
    boardFile: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchBoardDetails = async () => {
      try {
        const fetchedToken = sessionStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/board/getBoard/${boardId}`, {
          headers: {
            'Authorization': fetchedToken,
          }
        });
        const boardData = response.data;
        setFormData({
          boardId: boardData.boardId,
          deptCode: boardData.deptCode,
          empEmail: boardData.empEmail,
          boardTitle: boardData.boardTitle,
          boardContent: boardData.boardContent,
          boardDate: boardData.boardDate,
          boardFile: boardData.boardFile,
        });
      } catch (error) {
        console.error('Error fetching board details:', error);
      }
    };

    fetchBoardDetails();
  }, [boardId]);

  const handleDeptChange = async (e) => {
    const selectedDeptCode = e.target.value;
    setFormData({ ...formData, deptCode: selectedDeptCode });

    if (selectedDeptCode) {
      try {
        const token = sessionStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/department/${selectedDeptCode}`, {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          }
        });
        setFormData(prevState => ({
          ...prevState,
          // Update with fetched data as needed
        }));
      } catch (error) {
        console.error('Error fetching department details:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, boardFile: e.target.files[0] });
  };

  const updateBoard = async () => {
    try {
      const formDataObj = new FormData();

      for (const key in formData) {
        formDataObj.append(key, formData[key]);
      }
      const token = sessionStorage.getItem('jwt');
      const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/board/updateBoard/${boardId}`, formDataObj, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Response from server:', response.data);
      alert('게시글이 수정되었습니다.');
      navigate('/board-list');
    } catch (error) {
      console.error('Error updating board:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  const cancel = () => {
    if (window.confirm('정말 취소하시겠습니까?')) {
      navigate('/board-list');
    }
  };

  return (
    <div className="board-form-container">
      <h2>게시글 수정</h2>
      <form id="board-form">
        <div className="form-group">
          <label htmlFor="boardId">문서번호</label>
          <input
            type="text"
            id="boardId"
            name="boardId"
            readOnly
            value={formData['boardId']}
            onChange={(e) => setFormData({ ...formData, boardId: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="deptCode">부서코드</label>
          <select
            id="deptCode"
            name="deptCode"
            value={formData['deptCode']}
            onChange={handleDeptChange}
          >
            <option value="">부서 선택</option>
            {departments.map(dept => (
              <option key={dept.deptCode} value={dept.deptCode}>
                {dept.deptCode}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="empEmail">작성자 이메일</label>
          <input
            type="email"
            id="empEmail"
            name="empEmail"
            value={formData['empEmail']}
            onChange={(e) => setFormData({ ...formData, empEmail: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="boardTitle">제목</label>
          <input
            type="text"
            id="boardTitle"
            name="boardTitle"
            value={formData['boardTitle']}
            onChange={(e) => setFormData({ ...formData, boardTitle: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="boardContent">내용</label>
          <textarea
            id="boardContent"
            name="boardContent"
            value={formData['boardContent']}
            onChange={(e) => setFormData({ ...formData, boardContent: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="boardDate">작성일</label>
          <input
            type="text"
            id="boardDate"
            name="boardDate"
            value={formData['boardDate']}
            onChange={(e) => setFormData({ ...formData, boardDate: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="boardFile">첨부파일</label>
          <input
            type="file"
            id="boardFile"
            name="boardFile"
            onChange={handleFileChange}
          />
        </div>

        <div className="buttons">
          <button type="button" onClick={updateBoard}>수정</button>
          <button type="button" onClick={cancel}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default BoardUpdate;
