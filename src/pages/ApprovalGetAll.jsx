import React from 'react';
import ApprovalGet from '../components/Approval/ApprovalGet';
import ApprovalSideBar from '../components/Approval/ApprovalSideBar';

const ApprovalGetAll = () => {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ flex: 0 }}>
        <ApprovalSideBar />
      </div>
      <div style={{ flex: 1 }}>
        <ApprovalGet /> {/** 4. 받은 결재함 */}
      </div>
    </div>
  );
};

export default ApprovalGetAll;