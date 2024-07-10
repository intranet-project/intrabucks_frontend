import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import $ from "jquery";

const ApprovalSendList = ({ isOpen, isClose }) => {
    const [dataList, setDataList] = useState([]);
    const [modalSelectOne, setModalSelectOne] = useState(false);
    const contentRef = useRef(null);
    const [d, setD] = useState();

    useEffect(() => {
        ApprovalSendListApi();
    }, []);

    //기안 문서함 리스트 출력
    const ApprovalSendListApi = async () => {
        try {
            const response = await axios.get('http://localhost:9000/api/v1/intrabucks/approval/selectApprovalList');
            console.log(response.data);
            setDataList(response.data);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    const [detailData, setDetailData] = useState({
        appDocId: null,
        documentType: {
            documentTypeId: null,
            documentTypeName: "",
            documentTypeContent: "",
            documentAuthority: "",
            documentFormName: ""
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
                deptId: null,
                deptCode: "",
                deptName: ""
            },
            workState: ""
        },
        appDocDepartmentGrade: "",
        appDocContent: null,
        appDocStage: "",
        appDocCreatedAt: "",
        appDocUpdatedAt: null,
        appDocPathString: ""
    });


    //기안 문서함 상세보기 출력
    const [approvalContent, setApprovalContent] = useState('');
    const openOneApproval = async (appDocId) => {
        console.log("appDocId : ", appDocId);
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/approval/checkApproval/${appDocId}`);
            setDetailData(response.data);
            setModalSelectOne(true);
            console.log(response.data);
        } catch (error) {
            console.error('에러 발생:', error);
        }



    };

    const closeOneDocument = () => {
        setModalSelectOne(false);
    };

    //전자결재 문서 값 출력
    //let appDocIdt_2 = detailData.appDocId; //결재번호
    //let department = detailData.appDocDepartment; //기안부서
    //let documentType = detailData.docTypeId; //문서종류
    //let appDocTitle = detailData.appDocTitle;//제목
    //let writer = detailData.empId.empName; //기안자
    //let writeDay = detailData.writeDay; //기안일
    //let grade = detailData.appDocDepartmentGrade; //비밀등급
    //let content = detailData.appDocContent; //결재내용

    useEffect(() => {

        //결재번호
        $("#documentNo").prop("hidden", true);
        if ($("#documentNo").is(":hidden")) {
            console.log("documentNo input은 hidden 처리되어 있습니다.");
        }
        $("#documentNoDisplay").html(detailData.appDocId);

        //기안부서
        $("#department").prop("hidden", true);
        if ($("#department").is(":hidden")) {
            console.log("department input은 hidden 처리되어 있습니다.");
        }
        $("#departmentDisplay").html(detailData.appDocDepartment);

        //기안자
        $("#writer").prop("hidden", true);
        if ($("#writer").is(":hidden")) {
            console.log("writer input은 hidden 처리되어 있습니다.");
        }
        $("#writerDisplay").html(detailData.empId.empName);

        //기안일
        $("#writeDay").prop("hidden", true);
        if ($("#writeDay").is(":hidden")) {
            console.log("writeDay input은 hidden 처리되어 있습니다.");
        }
        $("#writeDayDisplay").html(detailData.appDocDepartmentGrade);

        //비밀등급
        $("#grade").prop("hidden", true);
        if ($("#grade").is(":hidden")) {
            console.log("grade input은 hidden 처리되어 있습니다.");
        }
        $("#gradeDisplay").html(detailData.empId.empName);

        //제목
        $("#title").prop("hidden", true);
        if ($("#title").is(":hidden")) {
            console.log("title input은 hidden 처리되어 있습니다.");
        }
        $("#titleDisplay").html(detailData.appDocTitle);


        //내용
        $("#content").prop("hidden", true);
        if ($("#content").is(":hidden")) {
            console.log("content input은 hidden 처리되어 있습니다.");
        }
        $("#contentDisplay").html(detailData.appDocContent);

    }, [detailData])

    return (
        <div>
            {/** 기안함 리스트 */}
            <h2>보낸 결재 정보</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>문서종류</th>
                        <th>제목</th>
                        <th>기안부서</th>
                        <th>기안자</th>
                        <th>등급</th>
                        <th>결재상태</th>
                        <th>기안일</th>
                        <th>상세보기</th>
                    </tr>
                </thead>
                <tbody>
                    {dataList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.appDocId}</td>
                            <td>{item.documentType.documentTypeName}</td>
                            <td>{item.appDocTitle}</td>
                            <td>{item.appDocDepartment}</td>
                            <td>{item.employee.empName}</td>
                            <td>{item.appDocDepartmentGrade}</td>
                            <td>{item.appDocStage}</td>
                            <td>{item.appDocCreatedAt}</td>
                            <td><button onClick={() => openOneApproval(item.appDocId)}>선택</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/** 기안함 상세보기 */}
            {modalSelectOne && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <h2>전자결재 상세보기 </h2>
                            <div dangerouslySetInnerHTML={{ __html: detailData.docTypeId.documentTypeContent }} />
                            <button onClick={closeOneDocument}>취소</button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ApprovalSendList;
