import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditManagerModal = ({ data, isOpen, onClose }) => {
    console.log(data);

    //사용될 값 선언
    const [editData, setEditData] = useState(data);

    //등록 버튼 누르면 API 실행
    const handleEditSubmit = async (e) => {
        //폼 제출 이벤트 방지
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/manager/storemanage/update/${editData.managerId}`, {
                // DTO의 변수 중 자료형이 엔티티일 경우,
                managerId: editData.managerId,
                store: editData.store,
                employee: editData.employee,
                managerName: editData.managerName,
                managerPassword: editData.managerPassword,
                managerEmail: editData.managerEmail,
                managerCreatedAt: editData.managerCreatedAt
            });
            console.log("수정 완료:", response.data);
            alert('관리자 정보가 수정되었습니다.');
            // 수정 후 모달 닫기
            onClose();
        } catch (error) {
            // 요청 실패
            console.error("에러 발생", error);
        }
    };


    useEffect(() => {
        setEditData(data);
    }, [data]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    // 모달 열리고, 데이터 넘어온 상태 체크
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h1>관리자 수정하기</h1>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>매장ID</label>
                            <p aria-readonly="true">{editData.store && editData.store.storeId}</p>
                        </div>
                        <div>
                            <label>관리자 이름</label>
                            <input
                                type="text"
                                name="managerName"
                                value={editData.managerName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>관리자 비밀번호</label>
                            <input
                                type="text"
                                name="managerPassword"
                                value={editData.managerPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>관리자 이메일</label>
                            <input
                                type="text"
                                name="managerEmail"
                                value={editData.managerEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>관리자 가입일자</label>
                            <input
                                type="text"
                                name="managerCreatedAt"
                                value={editData.managerCreatedAt}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit">저장</button>
                            <button type="button" onClick={onClose}>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditManagerModal;
