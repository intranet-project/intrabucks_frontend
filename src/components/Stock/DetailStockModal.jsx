import React, { useState } from 'react';
import '../../styles/AddStockModal.css';
import axios from 'axios';
import EditStockModal from './EditStockModal';

/**
 * @author 김아현
 * @version 2024-07-02
 * @version2 2024-07-15
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
                    <table className='stockDetailTable'>
                        <tr>
                            <td className='stockDetailTd'>자재명</td>
                            <td className='stockDetailTd'>{detailData.material && detailData.material.materialName} (코드 : {detailData.material.materialId})</td>
                        </tr>
                        <tr>
                            <td className='stockDetailTd'>매장명</td>
                            <td className='stockDetailTd'> {detailData.store && detailData.store.storeName} (코드 : {detailData.store.storeId})</td>
                        </tr>
                        <tr>
                            <td className='stockDetailTd'>매장주소</td>
                            <td className='stockDetailTd'>{detailData.store.storeAddress}</td>
                        </tr>
                        <tr>
                            <td className='stockDetailTd'>재고수량</td>
                            <td className='stockDetailTd'>{detailData.stockCount} 개</td>
                        </tr>
                    </table>
                    <br></br>

                    <div>
                        <button className='stockDetailButton' onClick={handleCancel}>취소</button>
                        <button className='stockDetailButton' onClick={openEditStockModal}>수정하기</button>
                        <button className='stockDetailButton' onClick={() => goToDelete(detailData.stockId)}>삭제하기</button>
                    </div>
                </div>
            </div>

            {
                modalEditStockOpen && (
                    <EditStockModal
                        data={detailData}
                        isOpen={modalEditStockOpen}
                        onClose={closeEditStockModal}
                    />
                )
            }

        </div >
    );
};

export default DetailStockModal;
