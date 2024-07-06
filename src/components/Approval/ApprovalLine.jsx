import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../../styles/ApprovalLine.css';

const ApprovalLine = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [approvalLine, setApprovalLine] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null); // 추가: 활성화된 메뉴 상태
  const [sessionData, setSessionData] = useState(null); // 세션 데이터 상태 추가
  

  // 전체조회 API
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/employee/selectOnly');
      const employeesData = response.data;
      console.log(employeesData);
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };


  // 세션 정보 요청 함수
  const getSession = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/Approval1/session');
      const sessionData = response.data;
      setSessionData(sessionData); // 세션 데이터 설정

    } catch (error) {
      console.error('Error fetching session:', error);
    }
  };

  // useEffect를 이용해 초기 데이터 로딩
  useEffect(() => {
    getSession(); // 세션 정보 로딩
  }, []); // 빈 배열은 한 번만 호출됨을 의미

  // 나머지 코드는 그대로 유지되어야 함





// 조직도 메뉴 열고 닫기
  const handleSubMenuToggle = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null); // 이미 활성화된 메뉴를 누르면 닫음
    } else {
      setActiveMenu(menu); // 새로운 메뉴를 누르면 해당 메뉴를 열고 다른 메뉴는 닫음
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

 // 직급 우선 순위 정의
const positionPriority = {
  '팀원': 1,
  '팀장': 2,
  '사장': 3
};


//수정중
const [applicants, setApplicants] = useState([]);

useEffect(() => {
  if (sessionData) {
    const applicant = {
      empId: sessionData.empId,
      deptCode: sessionData.deptCode,
      empName: sessionData.empName,
      empPosition: sessionData.empPosition,
      approvalState: "기안자"
    };
    setApplicants([applicant]);
  }
}, [sessionData]);




const handlePersonClick = (empId) => {
  const selectedEmployee = employees.find(emp => emp.empId === empId);
  if (!selectedEmployee) return;

  // 기안자가 이미 선택되어 있으면 추가하지 않음
  if (applicants.some(applicant => applicant.empId === selectedEmployee.empId)) {
    return;
  }

  // 이미 선택된 결재자들 중 가장 높은 직급을 찾기
  let highestPosition = -1;
  if (selectedEmployees.length > 0) {
    highestPosition = Math.max(...selectedEmployees.map(emp => positionPriority[emp.empPosition]));
  }

  // 선택한 직원의 직급 우선 순위 가져오기
  const selectedPosition = positionPriority[selectedEmployee.empPosition];

  // 직급 우선 순위 비교하여 결재자 추가 여부 결정
  if (selectedPosition < highestPosition) {
    alert('직급 우선 순위에 맞게 선택하세요.');
    return;
  }

  // 세션 데이터로 조회된 기안자는 항상 첫 번째로 배열에 추가
  if (applicants.length === 0) {
    setApplicants([selectedEmployee]);
  } else {
    setSelectedEmployees(prevSelected => {
      if (prevSelected.length >= 3) {
        alert('결재자는 최대 3명까지만 추가할 수 있습니다.');
        return prevSelected;
      }
      if (!prevSelected.some(emp => emp.empId === empId)) {
        return [...prevSelected, selectedEmployee];
      }
      return prevSelected;
    });
  }
};


  const handleRemoveFromSelectedEmployees = (empId) => {
    const updatedSelectedEmployees = selectedEmployees.filter(person => person.empId !== empId);
    setSelectedEmployees(updatedSelectedEmployees);
  };



  // 결재순위확인
  const isValidApprovalOrder = (approvalLineDTOs) => {
    const chiefIndex = approvalLineDTOs.findIndex(person => person.empPosition === '결재자');
    const presidentIndex = approvalLineDTOs.findIndex(person => person.empPosition === '사장');
    
    // 팀장이 사장보다 먼저 선택되어야 함
    return chiefIndex === -1 || presidentIndex === -1 || chiefIndex < presidentIndex;
  };


// 직원제거
  const handleRemoveFromApprovalLine = (empId) => {
    const updatedApprovalLine = approvalLine.filter(person => person.empId !== empId);
    setApprovalLine(updatedApprovalLine);
  };

 // 결재라인등록
  const handleConfirm = async () => {
    
    try {
      const approvals = selectedEmployees.map((person, index) => ({
        employee: person,
        approvalState: '결재자', // 첫 번째 선택한 사람은 '기안자', 그 외에는 '결재자'로 설정
        deptCode: person.deptCode // 부서 코드를 DTO에 추가
      }));
      const approvalSteps = [...applicants, ... approvals];
      
      const approvalLineDTO = {
        approvalSteps: approvalSteps,

      };
  
      console.log('결재 라인 DTOs:', approvalLineDTO);
  
      const response = await axios.post('http://localhost:9000/api/Approval1/create', approvalLineDTO);
      console.log('결재 라인 생성됨:', response.data);

      setApprovalLine([]); // 결재선 초기화
      setSelectedEmployees([]); // 선택된 직원 초기화
      setModalIsOpen(false);

       // 등록 완료 알림
       alert('등록이 완료되었습니다.');
      
    } catch (error) {
      console.error('결재 라인 생성 오류:', error);
      alert('결재 라인 생성 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.empName.includes(searchQuery)
  );

  const handleCancel = () => {
    setSelectedEmployees([]); // 선택된 직원 초기화
    setApprovalLine([]); // 결재선 초기화
    setModalIsOpen(false); // 모달 닫기
  };

  return (
    <div>
      <button onClick={() => setModalIsOpen(true)}>모달 열기</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            maxHeight: '80vh',
            overflowY: 'auto',
            padding: '20px'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
            <span>결재 정보</span>
            <button onClick={() => setModalIsOpen(false)}>닫기</button> {/* 수정: 닫기 버튼 */}
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', padding: '10px 0' }}>
            <div style={{ flex: 1, borderRight: '1px solid #ddd', padding: '10px' }}>
              <div style={{ marginBottom: '10px' }}>
                <input
                  type="text"
                  placeholder="이름 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '10px' }}>
                <h1>조직도</h1>
                <h3 onClick={() => handleSubMenuToggle('임원')}>임원</h3>
                {activeMenu === '임원' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'EB') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('경영 지원 부서')}>경영 지원 부서</h3>
                {activeMenu === '경영 지원 부서' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'MS') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('총무부')}>총무부</h3>
                {activeMenu === '총무부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'GA') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('구매부')}>구매부</h3>
                {activeMenu === '구매부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'PD') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('인사부')}>인사부</h3>
                {activeMenu === '인사부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'HR') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('재무부')}>재무부</h3>
                {activeMenu === '재무부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'FD') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('DM부')}>DM부</h3>
                {activeMenu === 'DM부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'DM') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('물류부')}>물류부</h3>
                {activeMenu === '물류부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'LO') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('연구개발부')}>연구개발부</h3>
                {activeMenu === '연구개발부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'RD') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('고객지원부')}>고객지원부</h3>
                {activeMenu === '고객지원부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'CS') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
                <h3 onClick={() => handleSubMenuToggle('마케팅부')}>마케팅부</h3>
                {activeMenu === '마케팅부' && (
                  <ul>
                    {filteredEmployees
                      .filter(employee => employee.deptCode === 'MD') // 부서 코드를 사용하여 필터링
                      .map(employee => (
                        <li key={employee.empId} onClick={() => handlePersonClick(employee.empId)}>
                          {employee.empName} - {employee.empPosition}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
            <div style={{ flex: 1, padding: '10px' }}>
              <div style={{ marginBottom: '10px' }}>
                <h1>결재선</h1>
                <h3>기안자</h3>
                {applicants.map((applicant) => (
                  <div key={applicant.empId}>
                    {applicant.deptCode} - {applicant.empName} - {applicant.empPosition}
                    {/* 필요한 정보들 추가 */}
                  </div>
                ))}

                <h3>결재자</h3>
                <ul>
                  {selectedEmployees.map((person, index) => (
                    <li key={person.empId}>
                      {person.deptCode} - {person.empName} - {person.empPosition}
                      <button onClick={() => handleRemoveFromSelectedEmployees(person.empId)}>제거</button>
                    </li>
                  ))}
                </ul>
                
                <ul>
                  {approvalLine.map((person) => (
                    <li key={person.empId}>
                      {person.deptCode} - {person.empName} - {person.empPosition}
                      <button onClick={() => handleRemoveFromApprovalLine(person.empId)}>제거</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button onClick={handleConfirm} style={{ marginLeft: '10px' }}>등록</button>
          <button onClick={handleCancel} style={{ marginLeft: '10px' }}>취소</button>
        </div>
      </Modal>
    </div>
  );
};

export default ApprovalLine;