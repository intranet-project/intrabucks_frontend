import React, { useState, useEffect } from 'react';
import '../../styles/AddStockModal.css';
import axios from 'axios';

const EditPurchaseModal = ({ data, isOpen, onClose }) => {
    const [editData, setEditData] = useState(data);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/purchase/updatePurchaseItem/${editData.purchaseId}`, {
                purchaseId: editData.purchaseId,
                manager: {
                    managerId: editData.manager.managerId,
                },
                material: {
                    materialId: editData.material, // materialId를 단순히 editData.material로 설정
                },
                purchaseCount: editData.purchaseCount,
                purchaseRequireDate: editData.purchaseRequireDate,
                purchaseAcceptDate: editData.purchaseAcceptDate,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            });
            console.log("수정 완료:", response.data);
            onClose();
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    useEffect(() => {
        setEditData(data);
    }, [data]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h1>발주 수정하기</h1>

                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>번호</label>
                            <input
                                type="number"
                                name="purchaseId"
                                value={editData.purchaseId}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div>
                            <label>매니저아이디</label>
                            <input
                                type="number"
                                name="managerId"
                                value={editData.manager.managerId}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div>
                            <label>매니저이름</label>
                            <input
                                type="text"
                                name="managerName"
                                value={editData.manager.managerName}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div>
                            <label>매니저연락처</label>
                            <input
                                type="text"
                                name="empPhone"
                                value={editData.manager.employee.empPhone}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div>
                            <label>매니저 소속</label>
                            <input
                                type="text"
                                name="department"
                                value={`${editData.manager.employee.department.deptName} ${editData.manager.employee.empPosition}`}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div>
                            <label>매장명</label>
                            <input
                                type="text"
                                name="storeName"
                                value={editData.manager.store.storeName}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div>
                            <label>매장주소</label>
                            <input
                                type="text"
                                name="storeAddress"
                                value={editData.manager.store.storeAddress}
                                onChange={handleChange}
                                readOnly
                                required
                            />
                        </div>

                        <div>
                            <label>발주아이디</label>
                            <input
                                type="number"
                                name="material"
                                value={editData.material}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>발주수량</label>
                            <input
                                type="number"
                                name="purchaseCount"
                                value={editData.purchaseCount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>발주요청일</label>
                            <input
                                type="text"
                                name="purchaseRequireDate"
                                value={editData.purchaseRequireDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>발주완료일</label>
                            <input
                                type="text"
                                name="purchaseAcceptDate"
                                value={editData.purchaseAcceptDate}
                                onChange={handleChange}
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

export default EditPurchaseModal;
