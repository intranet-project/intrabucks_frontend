import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import '../../styles/ApprovalBox.css';
import '../../styles/AddStockModal.css';
import $ from 'jquery';

const ApprovalSideBar = ({ isOpen, isClose }) => {

    //사이드 바
    const [activeMenu, setActiveMenu] = useState('전자결재'); // 초기 상태를 '전자결재'로 설정하여 메뉴가 항상 열려 있도록 함
    const navigate = useNavigate();

    const handleMainMenu = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu(null); // 이미 활성화된 메뉴를 누르면 닫음
        } else {
            setActiveMenu(menu); // 새로운 메뉴를 누르면 해당 메뉴를 열고 다른 메뉴는 닫음
            if (menu === '새 결재 진행') {
                navigate('/approvalSideBar'); // 새 결재 진행 클릭 시 이동할 페이지
            } else if (menu === '홈') {
                navigate('/approvalPage'); // 홈 클릭 시 이동할 페이지
            }
        }
    };

    // 보낸결재함(사이드바 목록)
    const handleApprovalSendManagementClick = (e) => {
        e.stopPropagation();
        navigate('/approvalSendList');
    }

    // 받을결재대기함(사이드바 목록)
    const handleApprovalWaitingManagementClick = (e) => {
        e.stopPropagation();
        navigate('/approvalWaitingAll');
    }

    // 받은결재함(사이드바 목록)
    const handleApprovalGetManagementClick = (e) => {
        e.stopPropagation();
        navigate('/approvalGetAll');
    }


    //조직도 및 결재라인 선택
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [approvalLine, setApprovalLine] = useState([]);
    const [activeMenu1, setActiveMenu1] = useState(null); // 추가: 활성화된 메뉴 상태
    const [sessionData, setSessionData] = useState({
        empId: null,
        empName: "",
        empPassword: "",
        empEmail: "",
        empPhone: "",
        empAddress: "",
        empJoinDate: "",
        empPosition: "",
        deptCode: "",
        workState: "",
    }); // 세션 데이터 상태 추가



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
            console.log(response.data);
            setSessionData(response.data); // 세션 데이터 설정

        } catch (error) {
            console.error('Error fetching session:', error);
        }
    };

    // useEffect를 이용해 초기 데이터 로딩
    useEffect(() => {
        getSession(); // 세션 정보 로딩
    }, []); // 빈 배열은 한 번만 호출됨을 의미




    // 조직도 메뉴 열고 닫기
    const handleSubMenuToggle = (menu) => {
        if (activeMenu === menu) {
            setActiveMenu1(null); // 이미 활성화된 메뉴를 누르면 닫음
        } else {
            setActiveMenu1(menu); // 새로운 메뉴를 누르면 해당 메뉴를 열고 다른 메뉴는 닫음
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
    const [approvalLineString, setApprovalLineString] = useState('');
    const handleConfirm = async () => {

        try {
            const approvals = selectedEmployees.map((person, index) => ({
                employee: person,
                approvalState: '결재자', // 첫 번째 선택한 사람은 '기안자', 그 외에는 '결재자'로 설정
                deptCode: person.deptCode // 부서 코드를 DTO에 추가
            }));
            const approvalSteps = [...applicants, ...approvals];

            const approvalLineDTO = {
                approvalSteps: approvalSteps,

            };

            console.log('결재 라인 DTOs:', approvalLineDTO);

            const response = await axios.post('http://localhost:9000/api/Approval1/create', approvalLineDTO);
            console.log('결재 라인 생성됨:', response.data);

            //결재선 String 값 저장
            setApprovalLineString(response.data);

            setApprovalLine([]); // 결재선 초기화
            setSelectedEmployees([]); // 선택된 직원 초기화
            setModalIsOpen(false);

            // 등록 완료 알림
            alert('등록이 완료되었습니다.');

            // openFormList 함수 호출
            openFormList();

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






    // List form 선언
    const [formData, setFormData] = useState({
        documentTypeId: "",
        documentTypeName: "",
        documentTypeContent: "",
        documentAuthority: "",
        documentFormName: "",
    });

    const [formList, setFormList] = useState([]);
    const [modalFormListOpen, setModalFormListOpen] = useState(false);

    // 전자결재 리스트 출력 모달창 열고 닫기
    const openFormList = () => {
        console.log("openFormList called");
        setModalFormListOpen(true);
        apiSelectList();
    }

    const closeFormList = () => {
        alert("처음으로 돌아갑니다.");
        setModalFormListOpen(false);
    }

    // 전자결재 리스트 출력 api 연동
    const apiSelectList = async () => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/approval/selectFormList`);
            console.log("apiSelectList - data:", response.data);
            // Update form list state
            setFormList(response.data);
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    // 전자결재 1개 선택
    const [documentId, setDocumentId] = useState(null);
    const [selectOneDocument, setSelectOneDocument] = useState({
        documentTypeId: "",
        documentTypeName: "",
        documentTypeContent: "",
        documentAuthority: "",
        documentFormName: "",
    });
    const [modalSelectOneDocument, setModalSelectOneDocument] = useState(false);

    const openOneDocument = (id) => {
        setDocumentId(id); // documentId 설정
        setModalSelectOneDocument(true);
        apiSelectOne(id);
    }

    const closeOneDocument = () => {
        setModalSelectOneDocument(false);
    }

    // 전자결재 선택 api 연동
    const apiSelectOne = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/approval/selectOneForm/${id}`);
            console.log("apiSelectOne response.data: ", response.data);
            setSelectOneDocument(response.data);
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    //전자결재 string->html
    const htmlForm = `${selectOneDocument.documentTypeContent}`;

    //결재 올리기
    const [isApprovalCompleted, setIsApprovalCompleted] = useState(false); // 결재 성공 상태

    const saveHtml = async (selectOneDocument) => {
        try {
            const response = await apiSaveHtml(selectOneDocument);
            setIsApprovalCompleted(true); // 결재 성공 시 상태 변경
        } catch (error) {
            console.error("결재 오류 발생", error);
        }
    }

    //저장 api 구현
    //객체 선언
    const [saveForm, setSaveForm] = useState({
        appDocId: null,
        docTypeId: {
            documentTypeId: null,
            documentTypeName: "",
            documentTypeContent: "",
            documentAuthority: "",
            documentFormName: "",
        },
        appDocTitle: "",
        appDocDepartment: "",
        empId: {
            empId: null,
            empName: "",
            empPassword: "",
            empEmail: "",
            empPhone: "",
            empAddress: "",
            empJoinDate: "",
            empPosition: "",
            department: {
                deptCode: "",
            },
            workState: "",
        },
        appDocDepartmentGrade: "",
        appDocContent: "",
        appDocStage: "",
        appDocUpdatedAt: "",
        appDocPathString: "", // 결재경로 문자열
    });

    //input 값 선언
    const apiSaveHtml = async (selectOneDocument) => {
        try {
            // input 값 가져오기
            let department = $('#department').val();
            let writeDay = $('#writeDay').val();
            let documentNo = $('#documentNo').val();
            let writer = $('#writer').val();
            let grade = $('#grade').val();
            let content = document.getElementById('content').value;

            // let content = $('#content').val();
            let title = $('#title').val();

            let person1Name = $('#person1Name').val();
            let person2Name = $('#person2Name').val();
            let person3Name = $('#person3Name').val();

            let person1Stamp = $('#person1Stamp').val();
            let person2Stamp = $('#person2Stamp').val();
            let person3Stamp = $('#person3Stamp').val();

            // 데이터를 포함한 객체 생성
            const data = {
                appDocId: "",
                docTypeId: {
                    documentTypeId: selectOneDocument.documentTypeId,
                    documentTypeName: "",
                    documentTypeContent: "",
                    documentAuthority: "",
                    documentFormName: "",
                },
                appDocTitle: title,
                appDocDepartment: department,
                empId: {
                    empId: sessionData.empId,
                    empName: sessionData.empName,
                    empPassword: "",
                    empEmail: "",
                    empPhone: "",
                    empAddress: "",
                    empJoinDate: "",
                    empPosition: "",
                    department: {
                        deptCode: "",
                    },
                    workState: "",
                },
                appDocDepartmentGrade: grade,
                appDocContent: content,
                appDocStage: "기안",
                appDocCreatedAt: writeDay,
                appDocUpdatedAt: "",
                appDocPathString: approvalLineString, // 결재경로 문자열
            };

            // axios 요청 보내기
            const response = await axios.post(`http://localhost:9000/api/v1/intrabucks/approval/saveApproval`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            console.log("apiSaveHtml response.data: ", response.data);
            setSaveForm(response.data);
        } catch (error) {
            console.error("에러 발생", error);
            throw error; // 에러 처리
        }
    };

    const [file, setFile] = useState(null);

    //업로드
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const goToUploadFile = async (e) => {
        e.preventDefault();
        if (!file) {
            alert("파일을 선택하세요");
            return;
        }
    
        if (!saveForm.appDocId) {
            console.error("appDocId가 없습니다.");
            alert("파일 업로드 중 오류 발생: approvalID가 없습니다.");
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            const response = await axios.post(`http://localhost:9000/api/v1/intrabucks/approval/uploadFile/${saveForm.appDocId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            if (response.status === 200) {
                alert("파일 업로드 성공");
            } else {
                alert("파일 업로드 실패");
            }
        } catch (error) {
            console.error("파일 업로드 중 오류 발생", error);
            alert("파일 업로드 중 오류 발생");
        }
    
        // HTML 내용 저장
       // saveHtml(selectOneDocument);
    };

    //첨부파일 업로드 취소
    const cancelUpload = (uploadData) => {
        cancelUploadApi(uploadData);
    }

    //첨부파일 업로드 취소 api 연동
    const cancelUploadApi = async (uploadData) => {
        try {
            const response = await axios.delete(`http://localhost:9000/api/v1/intrabucks/approval/deleteFile/${uploadData.documentId}`, uploadData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // multipart/form-data 설정
                }
            });
            console.log("cancelUploadApi response.data: ", response.data);
           // setUploadData(response.data);
        } catch (error) {
            console.error("에러 발생", error);
        }
    }

    // 결재 성공 시 알림 표시
    useEffect(() => {
        if (isApprovalCompleted) {
            alert("결재가 성공적으로 완료되었습니다.");
        }
    }, [isApprovalCompleted]);

    return (
        <div>
            {/** 사이드바 */}
            <div className="approval-container">
                <div className="approval-sidebar">
                    < button className="new-payment" onClick={() => setModalIsOpen(true)} > 새 결재 진행</button>

                    <div className="frequently-used-forms">
                        <div>
                            <span className="menu-text" onClick={() => handleMainMenu('홈')}>홈</span>
                        </div>
                        <span className="menu-text" onClick={() => handleMainMenu('전자결재')}>전자결재</span>
                        {activeMenu === '전자결재' && (
                            <ul className="submenu">
                                <li className="sideBar-subitem" onClick={handleApprovalSendManagementClick}>
                                    보낸결재함
                                </li>
                                <li className="sideBar-subitem" onClick={handleApprovalWaitingManagementClick}>
                                    받은결재대기함
                                </li>
                                <li className="sideBar-subitem" onClick={handleApprovalGetManagementClick}>
                                    받은결재함
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/**결재라인 생성 */}
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
                                    {activeMenu1 === '임원' && (
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
                                    {activeMenu1 === '경영 지원 부서' && (
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
                                    {activeMenu1 === '총무부' && (
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
                                    {activeMenu1 === '구매부' && (
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
                                    {activeMenu1 === '인사부' && (
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
                                    {activeMenu1 === '재무부' && (
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
                                    {activeMenu1 === 'DM부' && (
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
                                    {activeMenu1 === '물류부' && (
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
                                    {activeMenu1 === '연구개발부' && (
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
                                    {activeMenu1 === '고객지원부' && (
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
                                    {activeMenu1 === '마케팅부' && (
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


            {/** 폼 선택하기 */}
            {
                modalFormListOpen && (

                    <div className="modal-overlay">
                        <div className="modal">
                        <button onClick={closeFormList}>닫기</button>
                            <div className="modal-content">
                                <h1>폼 선택</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>종류</th>
                                            <th>선택</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formList.map((form, index) => (
                                            <tr key={index}>
                                                <td>{form.documentTypeId}</td>
                                                <td>{form.documentFormName}</td>
                                                <td><button onClick={() => openOneDocument(form.documentTypeId)}>선택</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )
            }

            {/** 폼 출력 */}
            {
                modalSelectOneDocument && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <h2>전자결재 상세 정보</h2>
                                <div dangerouslySetInnerHTML={{ __html: htmlForm }} />

                                <div>
                                    <button onClick={() => saveHtml(selectOneDocument)} disabled={isApprovalCompleted}>
                                        내용저장
                                    </button>
                                    <button onClick={closeOneDocument}>취소</button>
                                </div>

                                <div>
                                    <h3>첨부파일 업로드</h3>
                                    <form onSubmit={(e) => goToUploadFile(e)}>
                                        <input type="file" name="file" onChange={handleFileChange}/> {/* name 속성을 'file'로 변경 */}
                                        <br /><br />
                                        <button type="submit">업로드</button>
                                    </form>
                                    <button onClick={() => cancelUpload()}>업로드 취소</button>
                                </div>
                            </div>
                            <button onClick={closeOneDocument}>등록</button>
                        </div>
                    </div>
                )
            }

        </div >
    );

}

export default ApprovalSideBar;
