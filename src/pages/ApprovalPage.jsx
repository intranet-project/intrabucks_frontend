import React from "react";

import ApprovalLine from "../components/Approval/ApprovalLine";
import ApprovalWaiting from "../components/Approval/ApprovalWaiting";
import ApprovalGet from "../components/Approval/ApprovalGet";
import ApprovalSideBar from "../components/Approval/ApprovalSideBar";

const ApprovalPage = () => {
    console.log("하이루_____________________________________________");

    return (
        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ flex: 0 }}>
                <ApprovalSideBar />
            </div>
            {/** 수정 가능  */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, paddingLeft: '20px' }}>
                    <ApprovalWaiting /> {/** 3. 결재 대기함 */}
                </div>
                <div style={{ flex: 1, paddingLeft: '20px' }}>
                    <ApprovalGet />{/** 4. 받은 결재함 */}
                </div>
            </div>
        </div>
    );
}

export default ApprovalPage;
