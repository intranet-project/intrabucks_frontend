import React from "react";
import Approval from "../components/Approval/Approval";
import ApprovalSideBar from "../components/Approval/ApprovalSideBar";

const ApprovalPage = () => {
    console.log("하이루_____________________________________________");

    return (
        <div>
            <ApprovalSideBar />
            <Approval />
        </div>
    );
}

export default ApprovalPage;
