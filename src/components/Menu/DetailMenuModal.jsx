import React, { useState } from 'react';
import axios from 'axios';
import EditMenuModal from './EditMenuModal';
import { useNavigate } from 'react-router-dom';

const DetailMenuModal = ({ detailData, isOpen, onClose }) => {
    const navigate = useNavigate();
    // 취소 버튼 클릭 핸들러
    const handleCancel = () => {
        onClose();
    };

    // 메뉴 삭제 데이터 API 호출 및 상태 업데이트
    const goToDelete = (menuId) => {
        deleteApi(menuId);
        onClose();
    };

    // 메뉴 삭제 데이터 API 
    const [deleteData, setDeleteData] = useState(null);
    const deleteApi = async (menuId) => {
        try {
            const response = await axios.delete(`http://localhost:9000/api/v1/intrabucks/menu/delete/${menuId}`);
            console.log("API Response - deleteApi:", response.data);
            alert('메뉴가 삭제되었습니다.');
            setDeleteData(response.data); // 상태 업데이트
            
            navigate(0);
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    // 수정 모달 열기
    //const [selectedStockData, setSelectedStockData] = useState(null);
    const [modalEditMenuOpen, setModalEditMenuOpen] = useState(false);

    const openEditMenuModal = () => {
        setModalEditMenuOpen(true);
    };

    const closeEditMenuModal = () => {
        setModalEditMenuOpen(false);
    };

    // 모달 열리고, 데이터 넘어온 상태 체크
    if (!isOpen || !detailData) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCancel}>&times;</span>
                    <h1>메뉴 상세보기</h1>

                    <div>
                        <label>메뉴명</label>
                        <p aria-readonly="true">{detailData.menuName}</p>
                    </div>

                    <div>
                        <label>카테고리명</label>
                        <p aria-readonly="true">{detailData.categoryName}</p>
                    </div>

                    <div>
                        <label>메뉴 가격</label>
                        <p aria-readonly="true">{detailData.menuPrice}</p>
                    </div>
                    <div>
                        <label>메뉴 상세</label>
                        <p aria-readonly="true">{detailData.menuDetail}</p>
                    </div>
                    <div>
                        <label>메뉴 이미지</label>
                        <p aria-readonly="true">{detailData.menuImg}</p>
                    </div>
                    <div>
                        <button onClick={handleCancel}>취소</button>
                        <button onClick={openEditMenuModal}>수정하기</button>
                        <button onClick={() => goToDelete(detailData.menuId)}>삭제하기</button>
                    </div>
                </div>
            </div>

            {modalEditMenuOpen && (
                <EditMenuModal
                    data={detailData}
                    isOpen={modalEditMenuOpen}
                    onClose={closeEditMenuModal}
                />
            )}

        </div>
    );
};

export default DetailMenuModal;
