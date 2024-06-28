import React from 'react';

const EmployeeList = () => {
  const employees = [
    {
      직원ID: '001',
      이름: '홍길동',
      비밀ID: 'password123',
      부서코드: 'A001',
      직책: '사원',
      이메일: 'hong@example.com',
      핸드폰: '010-1234-5678',
      주소: '서울시 강남구',
      입사일: '2023-01-15',
      재직상태: '재직중'
    },
    {
      직원ID: '002',
      이름: '김철수',
      비밀ID: 'password456',
      부서코드: 'B002',
      직책: '대리',
      이메일: 'kim@example.com',
      핸드폰: '010-9876-5432',
      주소: '경기도 고양시',
      입사일: '2022-06-01',
      재직상태: '재직중'
    }
    // 필요한 다른 직원 정보 추가 가능
  ];

  const handleNameClick = (name) => {
    console.log('선택한 직원 이름:', name);
    // 이벤트 핸들러에서 원하는 동작을 수행할 수 있습니다. 여기서는 콘솔에 직원 이름를 출력합니다.
  };

  return (
    <div className="employee-list-container">
      <h2>직원 정보</h2>
      <div className="table-wrapper">
        <table className="employee-list">
          <thead>
            <tr>
              <th>직원ID</th>
              <th>이름</th>
              <th>비밀ID</th>
              <th>부서코드</th>
              <th>직책</th>
              <th>입사일</th>
              <th>이메일</th>
              <th>핸드폰</th>
              <th>주소</th>
              <th>재직상태</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.직원ID}>
                <td>{employee.직원ID}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => handleNameClick(employee)}>{employee.이름}</td>
                <td>{employee.비밀ID}</td>
                <td>{employee.부서코드}</td>
                <td>{employee.직책}</td>
                <td>{employee.입사일}</td>
                <td>{employee.이메일}</td>
                <td>{employee.핸드폰}</td>
                <td>{employee.주소}</td>
                <td>{employee.재직상태}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;