import React from 'react';
import ApprovalSideBar from '../components/Approval/ApprovalSideBar';
import ApprovalWaiting from '../components/Approval/ApprovalWaiting';

const ApprovalWaitingAll = () => {
  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div style={{ flex: 0 }}>
        <ApprovalSideBar />
      </div>
      <div style={{ flex: 1, paddingLeft: '20px' }}>
        <ApprovalWaiting />
        {/**3. 받은 결재 대기함 */}
      </div>
    </div>
  );
};

export default ApprovalWaitingAll;