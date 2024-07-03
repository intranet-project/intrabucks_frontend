import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AddStockModal.css';

/**
 * @author 김아현
 * @version 2024-07-03
 * 발주 추가 관련 등록 폼으로, API 통신 및 모달 창 기능 구현
 */

const AddPurchaseModal = ({ isOpen, onClose }) => {

    //사용될 값 선언
    const [managerId, setManagerId] = useState(null);
    const [storeId, setStoreId] = useState(null);
    const [deptCode, setDeptCode] = useState(null);
    const [purchaseCount, setPurchaseCount] = useState(null);
    const [purchaseRequireDate, setPurchaseRequireDate] = useState(null);
    const [material, setMaterial] = useState(null);

    //등록 버튼 누르면 API 실행
    const handleSubmit = async (e) => {
        //폼 제출 이벤트 방지
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/v1/intrabucks/purchase/createPurchaseItem', {
                // DTO의 변수 중 자료형이 엔티티일 경우,

                manager: {
                    managerId: managerId,
                    managerName: "",
                    managerPassword: "",
                    managerEmail: "",
                    store: {
                        storeId: storeId,
                        storeName: "",
                        storeLatitude: 0,
                        storeLongitude: 0,
                        storeAddress: "",
                        storeCreatedAt: "",
                        storeClose: ""
                    },
                    managerCreatedAt: "",
                    employee: {
                        empId: "",
                        empName: "",
                        empPassword: "",
                        empEmail: "",
                        empPhone: "",
                        empAddress: "",
                        empJoinDate: "",
                        empPosition: "",
                        department: {
                            deptId: deptCode,
                            deptCode: "",
                            deptName: ""
                        },
                        workState: ""
                    }
                },
                material: {
                    materialId: material,
                    materialName: "",
                    materialCompany: "",
                    materialCompanyCode: "",
                    materialManager: "",
                    materialContact: "",
                    materialPrice: ""
                },
                purchaseCount: purchaseCount,
                purchaseRequireDate: purchaseRequireDate,
                purchaseAcceptDate: "",
                purchaseState: "",
                purchasePrice: "",
                purchaseTotalPrice: ""
            }
            );
            console.log("200", response.data);

            // 모달 창 닫기
            onClose();
        } catch (error) {
            // 요청 실패
            console.error('에러 발생', error);
        }

    };

    //취소 및 삭제 버튼 눌렀을 때
    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={handleCancel}>&times;</span>
                    <h1>발주 등록</h1>
                    <form onSubmit={handleSubmit}>

                        <div>
                            <label>매니저아이디</label>
                            <input
                                type="text"
                                value={managerId}
                                onChange={(e) => setManagerId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>매장아이디</label>
                            <input
                                type="number"
                                value={storeId}
                                onChange={(e) => setStoreId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>부서코드</label>
                            <input
                                type="text"
                                value={deptCode}
                                onChange={(e) => setDeptCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>자재코드</label>
                            <input
                                type="text"
                                value={material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>발주수량</label>
                            <input
                                type="text"
                                value={purchaseCount}
                                onChange={(e) => setPurchaseCount(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>발주요청일</label>
                            <input
                                type="text"
                                value={purchaseRequireDate}
                                onChange={(e) => setPurchaseRequireDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <button type="submit">등록</button>
                        </div>
                    </form>
                    <div>
                        <button onClick={handleCancel}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPurchaseModal;
