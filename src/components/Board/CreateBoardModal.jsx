import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * @author 김아현
 * @version 2024-08-16
 * 게시판 추가 관련 등록 폼으로, API 통신 및 모달 창 기능 구현
 */

const CreateBoardModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [dept, setDept] = useState('');
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 생성

  // 게시판 항목 생성 함수
  const createBoardItem = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로 고침 방지

    try {
      const token = sessionStorage.getItem('jwt');
      if (!token) {
        throw new Error('Token not found. Please log in.');
      }

      const response = await axios.post(
        'http://localhost:9000/api/v1/intrabucks/board/createBoard',
        {
          boardId: '', // 필요한 경우 빈 문자열을 기본값으로 사용
          boardTitle: title,
          boardContent: content,
          boardDate: date,
          boardFile: null,
          employee: {
            empId: '',
            empName: '',
            empPassword: token,
            empEmail: email,
            empPhone: '',
            empAddress: '',
            empJoinDate: '',
            empPosition: '',
            department: {
              deptCode: '',
              deptName: ''
            },
            workState: ''
          },
          department: {
            deptCode: dept,
            deptName: ''
          }
        },
        {
          headers: {
            'Authorization': token,
          }
        }
      );

      console.log('Response from server:', response.data);
      alert('게시글이 등록되었습니다.');
      navigate('/boardPage');
    } catch (error) {
      console.error('Error creating board:', error);
      alert('게시글 등록 중 오류가 발생했습니다.');
    }
  };

  // 모달 취소 함수
  const cancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h1>문서번호</h1>

          <form onSubmit={createBoardItem}>
            <div>
              <label>이메일</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label>제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label>내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div>
              <label>작성일</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div>
              <label>첨부파일</label>
              {/* 파일 업로드 기능이 필요하면 추가 구현 */}
            </div>

            <div>
              <button type="submit">
                등록
              </button>
              <button type="button" onClick={cancel}>
                취소
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBoardModal;
