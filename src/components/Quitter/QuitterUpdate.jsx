import React, { useState, useEffect  } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/Employee.css';

const QuitterUpdate = () => {
  const initialFormData = {
    퇴사자ID: '',
    이름: '',
    부서코드: '',
    직책: '',
    입사일: '',
    이메일: '',
    핸드폰: '',
    주소: '',
    퇴사일: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const location = useLocation();
 
  

  useEffect(() => {
    if (location.state && location.state.quitter) {
      setFormData(location.state.quitter);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateEmployee = () => {
    const requestOptions = {
      method: 'PUT', // 수정 요청이므로 PUT 메서드를 사용
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
  
    fetch(`http://localhost:9000/api/quitter/update/${formData.empId}`, requestOptions)
      .then(response => {
        if (response.ok) {
          alert('직원 정보가 수정되었습니다.');
          navigate('/quitter-list'); // 수정 성공 후 페이지 이동
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
      navigate('/quitter-list'); // 취소 후 리스트 페이지로 이동
    }
  };

  const deleteEmployee = () => {
    if (window.confirm("정말로 이 직원을 삭제하시겠습니까?")) {
      fetch(`http://localhost:9000/api/quitter/delete/${formData.quitId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          if (response.ok) {
            alert('직원이 삭제되었습니다.');
            navigate('/quitter-list');
          } else {
            alert('직원 삭제에 실패하였습니다.');
          }
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
          alert('직원 삭제 중 오류가 발생하였습니다.');
        });
    }
  };

  return (
    <form id="quitterform">
      {Object.keys(formData).map((key) => (
        <React.Fragment key={key}>
          <label htmlFor={key}>{key}</label>
          <input
            type="text"
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
        <button type="button" onClick={deleteEmployee}>삭제</button>
      </div>
    </form>
  );
}

export default QuitterUpdate;