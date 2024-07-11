import React, { useState } from 'react';
import '../../styles/AddStockModal.css';
import axios from 'axios';
import EditStockModal from './EditStockModal';

/**
 * @author 김아현
 * @version 2024-07-02
 * 재고 상세보기 폼으로, 수정 및 삭제 API 처리 데이터로 json 출력
 */

const DetailStockModal = ({ detailData, isOpen, onClose }) => {
    // 취소 버튼 클릭 핸들러
    const handleCancel = () => {
        onClose();
    };

    // 재고 삭제 데이터 API 호출 및 상태 업데이트
    const goToDelete = (stockId) => {
        deleteApi(stockId);
        onClose();
    };

    // 재고 삭제 데이터 API 
    const [deleteData, setDeleteData] = useState(null);
    const deleteApi = async (stockId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.delete(`http://localhost:9000/api/v1/intrabucks/stock/deleteOneStock/${stockId}`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log("API Response - deleteApi:", response.data);
            setDeleteData(response.data); // 상태 업데이트
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    // 수정 모달 열기
    //const [selectedStockData, setSelectedStockData] = useState(null);
    const [modalEditStockOpen, setModalEditStockOpen] = useState(false);

    const openEditStockModal = () => {
        setModalEditStockOpen(true);
    };

    const closeEditStockModal = () => {
        setModalEditStockOpen(false);
    };

    // 모달 열리고, 데이터 넘어온 상태 체크
    if (!isOpen || !detailData) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCancel}>&times;</span>
                    <h1>재고 상세보기</h1>

                    <div>
                        <label>자재코드</label>
                        <p aria-readonly="true">{detailData.material && detailData.material.materialId}</p>
                    </div>

                    <div>
                        <label>재고수량</label>
                        <p aria-readonly="true">{detailData.stockCount}</p>
                    </div>

                    <div>
                        <label>매장코드</label>
                        <p aria-readonly="true">{detailData.store && detailData.store.storeId}</p>
                    </div>

                    <div>
                        <button onClick={handleCancel}>취소</button>
                        <button onClick={openEditStockModal}>수정하기</button>
                        <button onClick={() => goToDelete(detailData.stockId)}>삭제하기</button>
                    </div>
                </div>
            </div>

            {modalEditStockOpen && (
                <EditStockModal
                    data={detailData}
                    isOpen={modalEditStockOpen}
                    onClose={closeEditStockModal}
                />
            )}

        </div>
    );
};

export default DetailStockModal;
