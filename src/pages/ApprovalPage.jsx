import React from "react";

import ApprovalLine from "../components/Approval/ApprovalLine";
import Approval from "../components/Approval/Approval";
import ApprovalWaiting from "../components/Approval/ApprovalWaiting";
import ApprovalGet from "../components/Approval/ApprovalGet";

const ApprovalPage = () => {
    console.log("하이루_____________________________________________");

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ flex: 0 }}>
            <Approval />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1 }}>
                <ApprovalWaiting />
            </div>
            <div style={{ flex: 1 }}>
                <ApprovalGet />
            </div>
        </div>
    </div>
  );
}

export default ApprovalPage;
