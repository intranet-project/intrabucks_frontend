import React, { useState } from 'react';
import '../../styles/AddStockModal.css';
import axios from 'axios';
import EditPurchaseModal from './EditPurchaseModal';

/**
 * @author 김아현
 * @version 2024-07-02
 * 재고 상세보기 폼으로, 수정 및 삭제 API 처리 데이터로 json 출력
 */

const DetailPurchaseModal = ({ detailData, isOpen, onClose }) => {

    console.log({ "detailData": detailData });

    // 취소 버튼 클릭 핸들러
    const handleCancel = () => {
        onClose();
    };

    // 재고 삭제 데이터 API 호출 및 상태 업데이트
    const goToDelete = (purchaseId) => {
        deleteApi(purchaseId);
        onClose();
    };

    // 재고 삭제 데이터 API 
    const [deleteData, setDeleteData] = useState(null);
    const deleteApi = async (purchaseId) => {
        try {
            console.log("+++++++++++++++++++++++++++purchaseId:", purchaseId);
            const response = await axios.delete(`http://localhost:9000/api/v1/intrabucks/purchase/deleteOnePurchase/${purchaseId}`);
            console.log("API Response - deleteApi:", response.data);
            setDeleteData(response.data); // 상태 업데이트
        } catch (error) {
            console.error("+++++++++++++++++++++++++++에러 발생", error);
        }
    };

    // 수정 모달 열기
    const [modalEditPurchaseOpen, setModalEditPurchaseOpen] = useState(false);

    const openEditPurchaseModal = () => {
        setModalEditPurchaseOpen(true);
    };

    const closeEditPurchaseModal = () => {
        setModalEditPurchaseOpen(false);
    };

    // 모달 열리고, 데이터 넘어온 상태 체크
    if (!isOpen || !detailData) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCancel}>&times;</span>
                    <h1>발주 상세보기</h1>

                    <div>
                        <label>번호</label>
                        <p aria-readonly="true">{detailData.purchaseId}</p>
                    </div>


                    <div>
                        <label>매니저아이디</label>
                        <p aria-readonly="true">{detailData.manager.managerId}</p>
                    </div>


                    <div>
                        <label>매니저이름</label>
                        <p aria-readonly="true">{detailData.manager.managerName}</p>
                    </div>

                    <div>
                        <label>매니저연락처</label>
                        <p aria-readonly="true">{detailData.manager.employee.empPhone}</p>
                    </div>

                    <div>
                        <label>매니저 소속</label>
                        <p aria-readonly="true">{detailData.manager.employee.department.deptName}  {detailData.manager.employee.empPosition}</p>
                    </div>

                    <div>
                        <label>매장명</label>
                        <p aria-readonly="true">{detailData.manager.store.storeName}</p>
                    </div>

                    <div>
                        <label>매장주소</label>
                        <p aria-readonly="true">{detailData.manager.store.storeAddress}</p>
                    </div>


                    <div>
                        <label>발주상품</label>
                        <p aria-readonly="true">{detailData.material.materialName}</p>
                    </div>

                    <div>
                        <label>상품 가격</label>
                        <p aria-readonly="true">{detailData.material.materialPrice}</p>
                    </div>

                    <div>
                        <label>거래처명</label>
                        <p aria-readonly="true">{detailData.material.materialCompany}</p>
                    </div>

                    <div>
                        <label>담당자</label>
                        <p aria-readonly="true">{detailData.material.materialManager}</p>
                    </div>

                    <div>
                        <label>담당자연락처</label>
                        <p aria-readonly="true">{detailData.material.materialContact}</p>
                    </div>

                    <div>
                        <label>발주수량</label>
                        <p aria-readonly="true">{detailData.purchaseCount}</p>
                    </div>

                    <div>
                        <label>발주요청일</label>
                        <p aria-readonly="true">{detailData.purchaseRequireDate}</p>
                    </div>

                    <div>
                        <label>발주완료일</label>
                        <p aria-readonly="true">{detailData.purchaseAcceptDate}</p>
                    </div>

                    <div>
                        <label>발주처리상태</label>
                        <p aria-readonly="true">{detailData.purchaseState}</p>
                    </div>

                    <div>
                        <label>총가격</label>
                        <p aria-readonly="true">{detailData.purchaseTotalPrice}</p>
                    </div>

                    <div>
                        <button onClick={handleCancel}>취소</button>
                        <button onClick={openEditPurchaseModal}>수정하기</button>
                        <button onClick={() => goToDelete(detailData.purchaseId)}>삭제하기</button>
                    </div>
                </div>
            </div>

            {modalEditPurchaseOpen && (
                <EditPurchaseModal
                    data={detailData}
                    isOpen={modalEditPurchaseOpen}
                    onClose={closeEditPurchaseModal}
                />
            )}

        </div>
    );
};

export default DetailPurchaseModal;
