import React from 'react';
import Approval from '../components/Approval/Approval';
import ApprovalGet from '../components/Approval/ApprovalGet';

const ApprovalGetAll = () => {
    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ flex: 0 }}>
          <Approval />
        </div>
        <div style={{ flex: 1 }}>
          <ApprovalGet />
        </div>
      </div>
    );
};

export default ApprovalGetAll;