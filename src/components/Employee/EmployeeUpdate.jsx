import React, { useState } from 'react';
import '../../styles/Employee.css';
import { useNavigate } from 'react-router-dom';


const EmployeeUpdate = () => {
  const initialFormData = {
    직원ID: '',
    이름: '',
    비밀ID: '',
    부서코드: '',
    직책: '',
    입사일: '',
    이메일: '',
    핸드폰: '',
    주소: '',
    재직상태: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEmployee = () => {
    const requestOptions = {
      method: 'PUT', // 수정 요청이므로 PUT 메서드를 사용
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
  
    fetch(`http://your-server-api-url/update/${formData.직원ID}`, requestOptions)
      .then(response => {
        if (response.ok) {
          alert('직원 정보가 수정되었습니다.');
          navigate('/employee-list'); // 수정 성공 후 페이지 이동
        } else {
          alert('직원 정보 수정에 실패하였습니다.');
        }
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        alert('직원 정보 수정 중 오류가 발생하였습니다.');
      });
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setFormData(initialFormData); // 폼 데이터 초기화
    }
  };

  const deleteEmployee = () => {
    if (window.confirm("정말로 이 직원을 퇴사등록하시겠습니까? 직원정보가 삭제됩니다.")) {
      // 삭제 로직을 여기에 구현하세요
      alert("직원이 삭제되었습니다.");
      // 예를 들어, 서버에서 해당 직원 데이터를 삭제하고, 리스트에서 제거하는 등의 작업을 수행할 수 있습니다.
      navigate('/quitterList');
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
        <button type="button" onClick={deleteEmployee}>퇴사등록</button>
      </div>
    </form>
  );
}

export default EmployeeUpdate;