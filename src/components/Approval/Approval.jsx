import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ApprovalBox.css';

const Approval = () => {
  const [activeMenu, setActiveMenu] = useState('전자결재'); // 초기 상태를 '전자결재'로 설정하여 메뉴가 항상 열려 있도록 함
  const navigate = useNavigate();

  const handleSubMenuToggle = (menu) => {
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

  // 보낸결재함
  const handleApprovalSendManagementClick = (e) => {
    e.stopPropagation();
    navigate('/approvalPage');
  }

  // 받을결재대기함
  const handleApprovalWaitingManagementClick = (e) => {
    e.stopPropagation();
    navigate('/approvalWaitingAll');
  }

  // 받은결재함
  const handleApprovalGetManagementClick = (e) => {
    e.stopPropagation();
    navigate('/approvalGetAll');
  }

  const handleApproval = (e) => {
    //e.stopPropagation();
    navigate('/approvalSideBar');
  }

  return (
    <div className="approval-container">
      <div className="approval-sidebar">
        <button onClick={(e) => handleApproval(e)}>새 결재 진행</button>
        <div className="frequently-used-forms">

          <div>
            <span onClick={(e) => handleSubMenuToggle(e)}>홈</span>
          </div>

          <span onClick={(e) => handleSubMenuToggle(e)}>전자결재</span>

          {activeMenu === '전자결재' && (
            <ul className="submenu">
              <li onClick={handleApprovalSendManagementClick}>
                보낸결재함
              </li>
              <li onClick={handleApprovalWaitingManagementClick}>
                받은결재대기함
              </li>
              <li onClick={handleApprovalGetManagementClick}>
                받은결재함
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Approval;
