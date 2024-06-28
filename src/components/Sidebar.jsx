import React from 'react';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const handleItemClick = (itemName) => {
    console.log(`클릭된 항목: ${itemName}`);
    // 여기에서 다른 작업을 수행할 수도 있습니다.
  };

  return (
    <nav className="sidebar">
      <ul>
        <li className="sidebar-item" onClick={() => handleItemClick("로그인")}>로그인</li>
        <li className="sidebar-item" onClick={() => handleItemClick("홈")}>홈</li>
        <li className="sidebar-item" onClick={() => handleItemClick("인사관리")}>인사관리</li>
        <li className="sidebar-item" onClick={() => handleItemClick("매출관리")}>매출관리</li>
        <li className="sidebar-item" onClick={() => handleItemClick("재고관리")}>재고관리</li>
        <li className="sidebar-item" onClick={() => handleItemClick("상품관리")}>상품관리</li>
        <li className="sidebar-item" onClick={() => handleItemClick("발주관리")}>발주관리</li>
        <li className="sidebar-item" onClick={() => handleItemClick("전자결재")}>전자결재</li>
        <li className="sidebar-item" onClick={() => handleItemClick("매장관리")}>매장관리</li>
        <li className="sidebar-item" onClick={() => handleItemClick("CRM?")}>CRM?</li>
      </ul>
    </nav>
  );
}

export default Sidebar;