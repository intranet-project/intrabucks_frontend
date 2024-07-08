import React from 'react';
import Approval from "../components/Approval/Approval";
import ApprovalWaiting from "../components/Approval/ApprovalWaiting";


const ApprovalWaitingAll = () => {
    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ flex: 0 }}>
          <Approval />
        </div>
        <div style={{ flex: 1 }}>
          <ApprovalWaiting />
        </div>
      </div>
    );
};

export default ApprovalWaitingAll;