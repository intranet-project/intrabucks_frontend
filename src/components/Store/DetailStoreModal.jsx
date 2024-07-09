import React, { useState } from 'react';
import EditStoreModal from './EditStoreModal';
import EditManagerModal from './EditManagerModal';

const DetailStoreModal = ({ detailData, isOpen, onClose }) => {
    // 취소 버튼 클릭 핸들러
    const handleCancel = () => {
        onClose();
    };

    // 수정 모달 열기
    //const [selectedStoreData, setSelectedStoreData] = useState(null);
    const [modalEditStoreOpen, setModalEditStoreOpen] = useState(false);
    const [modalEditManagerOpen, setModalEditManagerOpen] = useState(false);

    const openEditStoreModal = () => {
        setModalEditStoreOpen(true);
    };

    const closeEditStoreModal = () => {
        setModalEditStoreOpen(false);
    };

    const openEditManagerModal = () => {
        setModalEditManagerOpen(true);
    };

    const closeEditManagerModal = () => {
        setModalEditManagerOpen(false);
    };

    // 모달 열리고, 데이터 넘어온 상태 체크
    if (!isOpen || !detailData) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCancel}>&times;</span>
                    <h1>매장 상세보기</h1>
                    <div>
                        <label>매장ID</label>
                        <p aria-readonly="true">{detailData.store && detailData.store.storeId}</p>
                    </div>
                    <div>
                        <label>매장 이름</label>
                        <p aria-readonly="true">{detailData.store && detailData.store.storeName}</p>
                    </div>
                    <div>
                        <label>매장 주소</label>
                        <p aria-readonly="true">{detailData.store && detailData.store.storeAddress}</p>
                    </div>
                    <div>
                        <label>매장 등록일자</label>
                        <p aria-readonly="true">{detailData.store && detailData.store.storeCreatedAt}</p>
                    </div>
                    <div>
                        <label>폐점여부</label>
                        <p aria-readonly="true">{detailData.store && detailData.store.storeClose}</p>
                    </div>
                    <div>
                        <label>직원ID</label>
                        <p aria-readonly="true">{detailData.employee && detailData.employee.empId}</p>
                    </div>
                    <div>
                        <label>관리자 이름</label>
                        <p aria-readonly="true">{detailData.managerName}</p>
                    </div>
                    <div>
                        <label>관리자 비밀번호</label>
                        <p aria-readonly="true">{detailData.managerPassword}</p>
                    </div>
                    <div>
                        <label>관리자 이메일</label>
                        <p aria-readonly="true">{detailData.managerEmail}</p>
                    </div>
                    <div>
                        <label>관리자 가입일자</label>
                        <p aria-readonly="true">{detailData.managerCreatedAt}</p>
                    </div>
                    <div>
                        <button onClick={handleCancel}>취소</button>
                        <button onClick={openEditStoreModal}>매장 수정하기</button>
                        <button onClick={openEditManagerModal}>관리자 수정하기</button>
                    </div>
                </div>
            </div>

            {modalEditStoreOpen && (
                <EditStoreModal
                    data={detailData.store}
                    isOpen={modalEditStoreOpen}
                    onClose={closeEditStoreModal}
                />
            )}

            {modalEditManagerOpen && (
                <EditManagerModal
                    data={detailData}
                    isOpen={modalEditManagerOpen}
                    onClose={closeEditManagerModal}
                />
            )}

        </div>
    );
};

export default DetailStoreModal;
