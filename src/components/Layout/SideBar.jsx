import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Sidebar.css';

const SideBar = () => {
  const [activeMenu, setActiveMenu] = useState(null); // 현재 활성화된 상위 메뉴 상태 관리
  const navigate = useNavigate();

  const handleSubMenuToggle = (menu) => {
    if (activeMenu === menu) {
      setActiveMenu(null); // 이미 활성화된 메뉴를 누르면 닫음
    } else {
      setActiveMenu(menu); // 새로운 메뉴를 누르면 해당 메뉴를 열고 다른 메뉴는 닫음
    }
  };

  const handleEmployeeListClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    navigate('/employee-list');
  };

  const handleDepartmentClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    navigate('/department');
  };

  const handleQuitterListClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    navigate('/quitterList');
  };

  const handleSalesManagementClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    navigate('/sales-management');
  };

  return (
    <nav className="sideBar">
      <ul>
      <li
          className={`sideBar-item ${activeMenu === '홈' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('홈')}
        >
          <span className="menu-text">홈</span>
        </li>
      <li
          className={`sideBar-item ${activeMenu === '로그인' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('로그인')}
        >
          <span className="menu-text">로그인</span>
        </li>
        <li
          className={`sideBar-item ${activeMenu === '인사관리' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('인사관리')}
        >
          <span className="menu-text">인사관리</span>
          {activeMenu === '인사관리' && (
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
          className={`sideBar-item ${activeMenu === '매출관리' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('매출관리')}
        >
          <span className="menu-text">매출관리</span>
          {activeMenu === '매출관리' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
                매출 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === '재고관리' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('재고관리')}
        >
          <span className="menu-text">재고관리</span>
          {activeMenu === '재고관리' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
                재고 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === '매장관리' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('매장관리')}
        >
          <span className="menu-text">매장관리</span>
          {activeMenu === '매장관리' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
               매장 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === '발주관리' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('발주관리')}
        >
          <span className="menu-text">발주관리</span>
          {activeMenu === '발주관리' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
                발주 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === '메뉴관리' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('메뉴관리')}
        >
          <span className="menu-text">메뉴관리</span>
          {activeMenu === '메뉴관리' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
                발주 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === 'CRM관리' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('CRM관리')}
        >
          <span className="menu-text">CRM관리</span>
          {activeMenu === 'CRM관리' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
                CRM 관리
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === '협업게시판' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('협업게시판')}
        >
          <span className="menu-text">협업게시판</span>
          {activeMenu === '협업게시판' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
                협업게시판
              </li>
            </ul>
          )}
        </li>
        <li
          className={`sideBar-item ${activeMenu === '전자결재' ? 'active' : ''}`}
          onClick={() => handleSubMenuToggle('전자결재')}
        >
          <span className="menu-text">전자결재</span>
          {activeMenu === '전자결재' && (
            <ul className="submenu">
              <li className="sideBar-subitem" onClick={handleSalesManagementClick}>
              전자결재
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default SideBar;
