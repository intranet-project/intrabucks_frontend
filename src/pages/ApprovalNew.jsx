import React from 'react';
import Approval from '../components/Approval/Approval';
import ApprovalSideBar from '../components/Approval/ApprovalSideBar';

const ApprovalNew = () => {
    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ flex: 0 }}>
          <Approval />
        </div>
        <div style={{ flex: 1 }}>
          <ApprovalSideBar />
        </div>
      </div>
    );
};

export default ApprovalNew;