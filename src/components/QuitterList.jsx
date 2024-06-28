import React from 'react';

const QuitterList = () => {
  const quitters = [
    {
      퇴사자ID: '001',
      이름: '홍길동',
      부서코드: 'A001',
      직책: '사원',
      이메일: 'hong@example.com',
      핸드폰: '010-1234-5678',
      주소: '서울시 강남구',
      입사일: '2022-11-20',
      퇴사일: '2023-11-20'
    },
    {
      퇴사자ID: '002',
      이름: '김철수',
      부서코드: 'B002',
      직책: '대리',
      이메일: 'kim@example.com',
      핸드폰: '010-9876-5432',
      주소: '경기도 고양시',
      입사일: '2022-11-20',
      퇴사일: '2023-11-20'
    }
    // 필요한 다른 퇴사자 정보 추가 가능
  ];

  const handleNameClick = (name) => {
    console.log('선택한 퇴사자 이름:', name);
    // 이벤트 핸들러에서 원하는 동작을 수행할 수 있습니다. 여기서는 콘솔에 퇴사자 이름을 출력합니다.
  };

  return (
    <div className="employee-list-container">
      <h2>퇴사자 정보</h2>
      <div className="table-wrapper">
        <table className="employee-list">
          <thead>
            <tr>
              <th>퇴사자ID</th>
              <th>이름</th>
              <th>부서코드</th>
              <th>직책</th>
              <th>이메일</th>
              <th>핸드폰</th>
              <th>주소</th>
              <th>입사일</th>
              <th>퇴사일</th>
            </tr>
          </thead>
          <tbody>
            {quitters.map(quitter => (
              <tr key={quitter.퇴사자ID}>
                <td>{quitter.퇴사자ID}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => handleNameClick(quitter)}>{quitter.이름}</td>
                <td>{quitter.부서코드}</td>
                <td>{quitter.직책}</td>
                <td>{quitter.이메일}</td>
                <td>{quitter.핸드폰}</td>
                <td>{quitter.주소}</td>
                <td>{quitter.입사일}</td>
                <td>{quitter.퇴사일}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuitterList;