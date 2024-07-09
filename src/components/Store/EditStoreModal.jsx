import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditStoreModal = ({ data, isOpen, onClose }) => {
    console.log(data);

    //사용될 값 선언
    const [editData, setEditData] = useState(data);
    
    //등록 버튼 누르면 API 실행
    const handleEditSubmit = async (e) => {
        //폼 제출 이벤트 방지
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/store/update/${editData.storeId}`, {
                // DTO의 변수 중 자료형이 엔티티일 경우,
                storeId: editData.storeId,
                storeName: editData.storeName,
                storeLatitude: 0,
                storeLongitude: 0,
                storeAddress: editData.storeAddress,
                storeCreatedAt: editData.storeCreatedAt,
                storeClose: editData.storeClose
            });
            console.log("수정 완료:", response.data);
            alert('매장 정보가 수정되었습니다.');
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
                    <h1>매장 수정하기</h1>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>매장ID</label>
                            <p aria-readonly="true">{editData.storeId}</p>
                        </div>
                        <div>
                            <label>매장 이름</label>
                            <input
                                type="text"
                                name="storeName"
                                value={editData.storeName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>매장 주소</label>
                            <input
                                type="text"
                                name="storeAddress"
                                value={editData.storeAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>매장 폐점여부</label>
                            <input
                                type="text"
                                name="storeClose"
                                value={editData.storeClose}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>매장 등록일자</label>
                            <p aria-readonly="true">{editData.storeCreatedAt}</p>
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

export default EditStoreModal;
