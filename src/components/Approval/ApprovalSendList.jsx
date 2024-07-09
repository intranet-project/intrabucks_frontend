import React, { useState, useEffect } from "react";
import axios from "axios";

const ApprovalSendList = ({ isOpen, isClose }) => {
    const [dataList, setDataList] = useState([]);
    const [modalSelectOne, setModalSelectOne] = useState(false);

    useEffect(() => {
        ApprovalSendListApi();
    }, []);

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
        docTypeId: {
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

    const openOneApproval = async (appDocId) => {
        console.log("appDocId : ", appDocId);
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/approval/checkApproval/${appDocId}`);
            console.log(response.data);
            setDetailData(response.data);
            setModalSelectOne(true);
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    const closeOneDocument = () => {
        setModalSelectOne(false);
    };

    return (
        <div>
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

            {modalSelectOne && (
                <div>
                    <h2>전자결재 상세보기 _ 테스트 단계</h2>
                    <button ></button>
                    <p>{detailData.appDocId}</p>
                    <p>{detailData.documentTypeName}</p>
                    <p>{detailData.appDocTitle}</p>
                    <p>{detailData.appDocDepartment}</p>
                    <p>{detailData.empId.empName}</p>
                    <p>{detailData.appDocContent}</p>
                </div>
            )}
        </div>
    );
};

export default ApprovalSendList;
