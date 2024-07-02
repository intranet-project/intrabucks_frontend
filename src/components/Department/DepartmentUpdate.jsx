import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Employee.css';

const DepartmentUpdate = () => {
    const initialFormData = {
        부서ID: '',
        부서코드: '',
        부서명: ''
      };
    
      const [formData, setFormData] = useState(initialFormData);
      const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const updateEmployee = () => {
        alert("수정 버튼이 클릭되었습니다.");
        // 수정 로직을 여기에 구현하세요
        // 예를 들어, 서버로 수정된 formData를 전송하거나 다른 처리를 수행할 수 있습니다.
      };
    
      const cancel = () => {
        if (window.confirm("취소하시겠습니까?")) {
          setFormData(initialFormData); // 폼 데이터 초기화
          // 취소 후 페이지 이동
          navigate('/department'); // 예시로 '/employee-list' 페이지로 이동하도록 설정
        }else{
          // 취소를 누르면 Alert 창이 종료됩니다.  
        }
      };
    
      return (
        <form id="employeeform">
          {Object.keys(formData).map((key) => (
            <React.Fragment key={key}>
              <label htmlFor={key}>{key}</label>
              <input
                type={key === '비밀ID' ? 'password' : 'text'}  // '비밀ID' 키일 경우 비밀번호 입력으로 처리
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </React.Fragment>
          ))}
          <div className="buttons">
            <button type="button" onClick={updateEmployee}>수정</button>
            <button type="button" onClick={cancel}>취소</button>
          </div>
        </form>
      );
};

export default DepartmentUpdate;