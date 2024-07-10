import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Sidebar.css";
import logoImg from "../../images/BlackBuckGrouwareLogo.png"; // 이미지 파일 import

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState(null); // 현재 활성화된 상위 메뉴 상태 관리
  const navigate = useNavigate();
  const token = sessionStorage.getItem('jwt');
  const checkAccessPermission = async (apiEndpoint, token) => {
    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        return { status: 401 };
      } else if (response.status === 403) {
        return { status: 403 };
      }
      return { status: 200 };
    } catch (error) {
      console.error('에러가 발생했습니다:', error);
      return { status: 500 };
    }
  };

  const handleSubMenuToggle = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null); // 이미 활성화된 메뉴를 누르면 닫음
    } else {
      setActiveMenu(menu); // 새로운 메뉴를 누르면 해당 메뉴를 열고 다른 메뉴는 닫음
      if (menu === "전자결재") {
        navigate("/approvalPage"); // 전자결재 클릭 시 이동할 페이지
      }
    }
  };

  const handleLoginClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    navigate("/login");
  };

  // 인사관리
  const handleEmployeeListClick = async (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/employee/select', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/employee-list");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  // 부서관리
  const handleDepartmentClick = async (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/department/create', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/department");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  // 퇴사관리
  const handleQuitterListClick = async (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/quitter/select', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/quitter-list");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  // 매출관리
  const handleSalesManagementClick = async (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/sales/list', token);
    console.log(result);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/sales-management");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  //재고관리 연결
  const handleStockManagementClick = async (e) => {
    e.stopPropagation();
    // 접근 권한 확인 (해당 API 엔드포인트를 전달)
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/stock/selectStockList', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/stockListPage");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  // 매장관리
  const handleStoreListClick = async (e) => {
    e.stopPropagation();
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/store/list', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/storeListPage");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  //발주관리 연결
  const handlePurchaseManagementClick = async (e) => {
    e.stopPropagation();
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/purchase/selectPurchaseList', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/purchaseListPage");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  // 메뉴관리
  const handleMenuListClick = async (e) => {
    e.stopPropagation();
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/menu/list', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/menuListPage");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  //전자결재 메인연결
  const handleApprovalManagementClick = (e) => {
    e.stopPropagation();
    navigate("/approvalPage");
  };

  //전자결재 연결
  const handleApprovalPageManagementClick = (e) => {
    e.stopPropagation();
    navigate("/approvalPage");
  };

  // 전자결재라인 생성
  const handleApprovalLineManagementClick = (e) => {
    e.stopPropagation();
    navigate("/approvalLine");
  };

  // 전자결재대기함 생성
  const handleApprovalWaitingManagementClick = (e) => {
    e.stopPropagation();
    navigate("/approvalWaiting");
  };

  //CRM 연결
  const handleVoiceListClick = async (e) => {
    e.stopPropagation();
    const result = await checkAccessPermission('http://localhost:9000/api/v1/intrabucks/customer/voiceList', token);
    if (result.status === 401) {
      alert('로그인이 필요합니다.');
      navigate("/login");
    } else if (result.status === 403) {
      alert('접근이 금지되었습니다.');
      navigate(-1);
    } else if (result.status === 200) {
      navigate("/voiceList");
    } else {
      alert('알 수 없는 오류가 발생했습니다.');
      navigate(-1);
    }
  };

  const handleAnswerClick = (e) => {
    e.stopPropagation();
    navigate("/voiceListPage");
  };

  return (
    <nav className="sideBar">
      <img src={logoImg} alt="Logo" />
      <ul>
        <li
          className={`sideBar-item ${activeMenu === "홈" ? "active" : ""}`}
          onClick={() => handleSubMenuToggle("홈")}
        >
          <span className="menu-text">홈</span>
        </li>
        <li
          className={`sideBar-item ${activeMenu === "로그인" ? "active" : ""}`}
          onClick={() => handleSubMenuToggle("로그인")}
        >
          <span className="menu-text">로그인</span>
          {activeMenu === "로그인" && (
            <ul className="submenu">
              <li
                className="sideBar-subitem"
                onClick={handleLoginClick}
              >
                로그인
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${
            activeMenu === "인사관리" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("인사관리")}
        >
          <span className="menu-text">인사관리</span>
          {activeMenu === "인사관리" && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleEmployeeListClick}>
                직원관리
              </li>
              <li className="sideBar-subitem" onClick={handleDepartmentClick}>
                부서관리
              </li>
              <li className="sideBar-subitem" onClick={handleQuitterListClick}>
                퇴사관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${
            activeMenu === "매출관리" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("매출관리")}
        >
          <span className="menu-text">매출관리</span>
          {activeMenu === "매출관리" && (
            <ul className="submenu">
              <li
                className="sideBar-subitem"
                onClick={handleSalesManagementClick}
              >
                매출 관리
              </li>
            </ul>
          )}
        </li>

        <li
          className={`sideBar-item ${
            activeMenu === "재고관리" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("재고관리")}
        >
          <span className="menu-text">재고관리</span>
          {activeMenu === "재고관리" && (
            <ul className="submenu">
              <li
                className="sideBar-subitem"
                onClick={handleStockManagementClick}
              >
                재고 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${
            activeMenu === "매장관리" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("매장관리")}
        >
          <span className="menu-text">매장관리</span>
          {activeMenu === "매장관리" && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleStoreListClick}>
                매장 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${
            activeMenu === "발주관리" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("발주관리")}
        >
          <span className="menu-text">발주관리</span>
          {activeMenu === "발주관리" && (
            <ul className="submenu">
              <li
                className="sideBar-subitem"
                onClick={handlePurchaseManagementClick}
              >
                발주 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${
            activeMenu === "메뉴관리" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("메뉴관리")}
        >
          <span className="menu-text">메뉴관리</span>
          {activeMenu === "메뉴관리" && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleMenuListClick}>
                메뉴 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === "CRM관리" ? "active" : ""}`}
          onClick={() => handleSubMenuToggle("CRM관리")}
        >
          <span className="menu-text">CRM관리</span>
          {activeMenu === "CRM관리" && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleVoiceListClick}>
                고객의소리 조회
              </li>
              <li className="sideBar-subitem" onClick={handleAnswerClick}>
                고객의소리 답변 등록
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${
            activeMenu === "협업게시판" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("협업게시판")}
        >
          <span className="menu-text">협업게시판</span>
          {activeMenu === "협업게시판" && (
            <ul className="submenu">
              <li
                className="sideBar-subitem"
                onClick={handleSalesManagementClick}
              >
                협업게시판
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${
            activeMenu === "전자결재" ? "active" : ""
          }`}
          onClick={() => handleSubMenuToggle("전자결재")}
        >
          <span
            className="menu-text"
            onClick={() => handleSubMenuToggle("전자결재")}
          >
            전자결재
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
