import axios from "axios";
import React, { useState, useEffect } from "react";

const ApprovalSideBar = ({ isOpen, isClose }) => {
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
        setModalFormListOpen(true);
        apiSelectList();
    }

    const closeFormList = () => {
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
    const [isApprovalCompleted, setIsApprovalCompleted] = useState(false); // 결재 성공 상태 추가

    const saveHtml = async (selectOneDocument) => {
        try {
            const response = await apiSaveHtml(selectOneDocument);
            setIsApprovalCompleted(true); // 결재 성공 시 상태 변경
        } catch (error) {
            console.error("결재 오류 발생", error);
        }
    }

    //저장 api 구현
    const [saveForm, setSaveForm] = useState({
        //dto 나열
        documentId: "",
        title: "",
        content: "",
        approvalStage: "",
        documentType: {
            documentTypeId: "",
            documentTypeName: "",
            documentTypeContent: "",
            documentAuthority: "",
            documentFormName: "",
        },
        createdAt: "",
        updatedAt: "",
        employee: {
            empId: "",
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
        departmentName: "",
        approvalPathString: "3,김영호,MS,기안자//-//4,박지영,MS,결재자//-//7,정지훈,GA,결재자//-//1,김철수,EB,결재자//-//",
    });


    // 저장 api 구현
    const apiSaveHtml = async (selectOneDocument) => {
        try {
            // 데이터를 포함한 객체 생성
            const data = {
                documentId: "",
                title: "",
                content: selectOneDocument.documentTypeContent,
                approvalStage: "",
                documentType: "selectOneDocument.documentTypeId",
                createdAt: "",
                updatedAt: "",
                employee: {
                    empId: 1,
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
                departmentName: "",
                approvalPathString: "3,김영호,MS,기안자//-//4,박지영,MS,결재자//-//7,정지훈,GA,결재자//-//1,김철수,EB,결재자//-//",
            };

            // axios 요청 보내기
            const response = await axios.post(`http://localhost:9000/api/v1/intrabucks/approval/saveApproval`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("apiSaveHtml response.data: ", response.data);
            setSaveForm(response.data);
            return response.data; // API 응답 반환
        } catch (error) {
            console.error("에러 발생", error);
            throw error; // 에러 처리
        }
    };

    //첨부파일 업로드 하기
    const goToUploadFile = (event) => {
        event.preventDefault();

        const formData = new FormData(); // FormData 객체 생성
        formData.append('file', event.target.file.files[0]); // 파일 추가

        // 파일 업로드 API 호출
        uploadApi(formData, saveForm.documentId);
    }

    //첨부파일 업로드 api 연동
    const [uploadData, setUploadData] = useState('');
    const uploadApi = async (formData, approvalId) => {
        try {
            const response = await axios.post(`http://localhost:9000/api/v1/intrabucks/approval/uploadFile/${approvalId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // multipart/form-data 설정
                }
            });
            console.log("uploadApi response.data: ", response.data);
            setUploadData(response.data);
        } catch (error) {
            console.error("에러 발생", error);
        }
    }

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
            setUploadData(response.data);
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

            {/** 폼 선택하기 */}
            {modalFormListOpen && (
                <div>
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
            )}

            {/** 폼 출력 */}
            {modalSelectOneDocument && (
                <div>
                    <h2>전자결재 상세 정보</h2>
                    <div dangerouslySetInnerHTML={{ __html: htmlForm }} />

                    <div>
                        <button onClick={() => saveHtml(selectOneDocument)} disabled={isApprovalCompleted}>
                            결재올리기
                        </button>
                        <button onClick={closeOneDocument}>취소</button>
                    </div>

                    <div>
                        <h3>첨부파일 업로드</h3>
                        <form onSubmit={(e) => goToUploadFile(e)}>
                            <input type="file" name="file" /> {/* name 속성을 'file'로 변경 */}
                            <br /><br />
                            <button type="submit">업로드</button>
                        </form>
                        <button onClick={() => cancelUpload()}>업로드 취소</button>
                    </div>
                </div>
            )}

        </div>
    );

}

export default ApprovalSideBar;
