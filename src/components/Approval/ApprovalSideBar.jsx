import React from "react";

const ApprovalSideBar = ({ isOpen, isClose }) => {

    // FORM LIST API 통신
    const apiSelectOne = () => {
        // API 호출 로직 추가
    }

    // 새 결재 버튼 클릭 시, FORM LIST API 통신 및 모달창에 띄우기
    const goToChoose = () => {
        apiSelectOne();
    }

    return (
        <div >
            <div>
                <button onClick={goToChoose}>새결재하기</button>
            </div>
            <ul>
                <li>나의 결재함</li>
                <li>너의 결재함</li>
                <li>우리의 결재함</li>
            </ul>
        </div>
    );
}

export default ApprovalSideBar;
