import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/ApprovalBox.css";
import $ from "jquery";
import approvedImage from "../../images/approved.png";

const ApprovalGet = ({ isOpen, isClose }) => {
  const [approvalDocuments, setApprovalDocuments] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지를 상태로 관리
  const [totalPages, setTotalPages] = useState(0); // 전체 페이지 수를 상태로 관리
  const [pageSize] = useState(10); // 페이지당 문서 수

  const [dataList, setDataList] = useState([]);
  const [modalSelectOne, setModalSelectOne] = useState(false);
  const token = sessionStorage.getItem("jwt");
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

  const getSession = async () => {
    try {
      const token = sessionStorage.getItem("jwt");
      const response = await axios.get(
        "http://localhost:9000/api/v1/intrabucks/approval1/session",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("session : ", response.data);
      setSessionData(response.data); // 세션 데이터 설정
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getSession();
    fetchApprovalDocuments(page); // 페이지가 변경될 때마다 문서 목록을 가져옴
  }, [page]); // 페이지가 변경될 때 useEffect가 호출되도록 설정

  /* API 문서 전체 목록 조회 */
  const fetchApprovalDocuments = async (pageNumber) => {
    const token = sessionStorage.getItem("jwt");
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/intrabucks/approval1/select?page=${pageNumber}&size=${pageSize}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const { content, totalPages } = response.data; // 서버에서 전달된 내용과 전체 페이지 수 추출
      setApprovalDocuments(content); // 문서 목록 업데이트
      setTotalPages(totalPages); // 전체 페이지 수 업데이트
    } catch (error) {
      console.error("Error fetching approvalDocuments:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber); // 페이지 변경 시 페이지 상태 업데이트
  };
  const [detailData, setDetailData] = useState({
    appDocId: null,
    documentType: {
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
        deptId: null,
        deptCode: "",
        deptName: "",
      },
      workState: "",
    },
    appDocDepartmentGrade: "",
    appDocContent: null,
    appDocStage: "",
    appDocCreatedAt: "",
    appDocUpdatedAt: null,
    appDocPathString: "",
  });

  //기안 문서함 상세보기 출력
  const [approvalContent, setApprovalContent] = useState("");
  const openOneApproval = async (appDocId) => {
    console.log("appDocId : ", appDocId);
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/intrabucks/approval/checkApproval/${appDocId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      ApprovalData(appDocId);
      setDetailData(response.data);
      setModalSelectOne(true);
      console.log(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const [ApprovalDataList, setApprovalData] = useState([]);
  const ApprovalData = async (appDocId) => {
    console.log("appDocId : ", appDocId);
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/intrabucks/approval/selectUser/${appDocId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("결재자정보:", response.data);
      setApprovalData(response.data);
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const updateApproval = async (empId, Result) => {
    console.log("empId : ", empId);
    console.log("Result : ", Result);
    console.log("ApprovalDataList : ", ApprovalDataList);
    if (window.confirm(Result + " 하시겠습니까?")) {
      try {
        const approvalData = ApprovalDataList.find(
          (approval) => approval.empId === empId
        );

        if (!approvalData) {
          console.error(`No approval data found for empId: ${empId}`);
          return;
        }

        const requestData = {
          ...approvalData,
          approvalResult: Result,
        };
        console.log("Request Data: ", requestData);
        console.log("Authorization: ", token);

        const response = await axios.put(
          `http://localhost:9000/api/v1/intrabucks/approval/updateUser`,
          requestData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("Response Data:", response.data);
        fetchApprovalDocuments(page);
        closeOneDocument();
      } catch (error) {
        console.error("에러 발생:", error);
        if (error.response) {
          console.error("서버 응답 데이터:", error.response.data);
        }
      }
    }
  };

  const closeOneDocument = () => {
    setApprovalData([]);
    setModalSelectOne(false);
  };

  //전자결재 문서 값 출력
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
    $("#writeDayDisplay").html(detailData.appDocCreatedAt);

    //비밀등급
    $("#grade").prop("hidden", true);
    if ($("#grade").is(":hidden")) {
      console.log("grade input은 hidden 처리되어 있습니다.");
    }
    $("#gradeDisplay").html(detailData.appDocDepartmentGrade);

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

    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const currentDate = new Date();
    const writerStamp = ApprovalDataList.map(
      (
        approval,
        index
      ) => `<table id="approvalLineTable1" style="float: left;  width: 120px; height: 180px; border-collapse: collapse; margin-left: auto; margin-right: 3px;">
                        <tr id="tr_position1">
                        <td rowspan="4" style="border: 1px solid black; width: 17%; padding: 5px; ">
                            <div>
                        <!-- 기안위치 -->
                                <span style="font-size: 10px; writing-mode: vertical-lr; white-space: nowrap; 
                                text-orientation: upright; letter-spacing: 0.2em;">
                                    ${approval.approvalType}
                                </span><br>
                            </div>
                        </td>
                        <!-- 기안자 직위 -->
                        <td style="border: 1px solid black; width: 83%; height: 15%;  padding: 5px; text-align: center;">
                            ${approval.approvalPosition}
                            <div class="person1PositionInput" id="person1Position" style="width: 100%; text-align: right;"></div>
                        </td> 
                        </tr>
                        <!-- 기안자 도장 -->
                        <tr id="tr_stamp1" style=" height: 55%; "> 
                            <td style="border: 1px solid black; text-align: center;">
                                <img src=${
                                  approval.approvalResult === "승인"
                                    ? approvedImage
                                    : ""
                                } alt="Approved " style="max-width: 86%; height: 86%; ${
        approval.approvalResult === "승인" ? "" : "display: none;"
      } "/>
                                </td>
                        </tr>
                        <!-- 기안자 이름 -->
                        <tr id="tr_name1">
                            <td style="border: 1px solid black; height: 15%; text-align: center; padding: 5px;">
                            ${approval.empName}
                            <div className='person1NameInput' type="text" id= "person1Name" name="person1Name" style="width: 100%; text-align: right;"></div>
                            </td>
                        </tr>
                        <!-- 기안일 -->
                        <tr id="tr_date1">
                            <td style="border: 1px solid black; height: 15%; text-align: center; padding: 5px;">
                            ${
                              approval.approvalDate !== null
                                ? approval.approvalDate
                                : ""
                            }    
                            <div className='person1DateInput' type="text" id="person1Date" name="person1Date" style="width: 100%; text-align: right;"></div>
                            </td>
                        </tr>
                    </table>`
    ).join("");
    $("#approvalLinePosition").append(writerStamp);
  }, [detailData, ApprovalDataList]);
  const cnt = 1;
  return (
    <div className="approval-list-container">
      <h2>결재 문서 정보</h2>
      <div className="table-wrapper">
        <table className="approval-list">
          <thead>
            <tr>
              <th>문서번호</th>
              <th>작성일</th>
              <th>문서유형</th>
              <th>제목</th>
              <th>작성자</th>
              <th>상태</th>
              <th>부서</th>
            </tr>
          </thead>
          <tbody>
            {approvalDocuments.map((document) => (
              <tr key={document.appDocId}>
                <td>{document.appDocId}</td>
                <td>{document.appDocCreatedAt}</td>
                <td>{document.docTypeId.documentTypeName}</td>{" "}
                {/* 문서 유형의 이름 필드 */}
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => openOneApproval(document.appDocId)}
                >
                  {document.appDocTitle}
                </td>
                <td>{document.empId.empName}</td> {/* 기안자의 이름 필드 */}
                <td>{document.appDocStage}</td>
                <td>{document.appDocDepartment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          이전
        </button>
        {Array.from(Array(totalPages).keys()).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages - 1}
        >
          다음
        </button>
      </div>
      {/** 기안함 상세보기 */}
      {modalSelectOne && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <div style={{ textAlign: "right" }}>
                {ApprovalDataList.map(
                  (approval, index) =>
                    approval.empId === sessionData.empId &&
                    approval.approvalStep !== 0 &&
                    approval.approvalResult !== "승인" && (
                      <div key={index} style={{ display: "inline-block" }}>
                        <button
                          key={index}
                          onClick={() =>
                            updateApproval(sessionData.empId, "승인")
                          }
                        >
                          승인
                        </button>
                        <button
                          onClick={() =>
                            updateApproval(sessionData.empId, "반려")
                          }
                        >
                          반려
                        </button>
                      </div>
                    )
                )}

                <button onClick={closeOneDocument}>취소</button>
              </div>
              <h2>전자결재 상세보기 </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: detailData.docTypeId.documentTypeContent,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovalGet;
