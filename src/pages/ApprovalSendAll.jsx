import React from "react";
import ApprovalSideBar from "../components/Approval/ApprovalSideBar";
import ApprovalSendList from "../components/Approval/ApprovalSendList";

const ApprovalSendAll = () => {

    return (

        <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div style={{ flex: 0 }}>
                <ApprovalSideBar />
            </div>
            <div style={{ flex: 1 }}>
                <ApprovalSendList /> {/** 2. 기안함 */}
            </div>
        </div>

    );
}

export default ApprovalSendAll;
