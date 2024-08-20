import React, { useState, useEffect } from "react";
import axios from "axios";
import DetailPurchaseModal from "./DetailPurchaseModal";
import AddPurchaseModal from "./AddPurchaseModal";


/**
 * @author 김아현
 * @version 2024-07-03
 * 발주 관련 내역 폼으로, API 통신 및 모달 창 기능 구현
 */

const PurchaseList = ({ data }) => {
    const [modalAddPurchaseOpen, setModalAddPurchaseOpen] = useState(false);
    const [modalDetailPurchaseOpen, setModalDetailPurchaseOpen] = useState(false);
    const [selectedPurchaseId, setSelectedPurchaseId] = useState(null);


    const [detailData, setDetailData] = useState({
        purchaseId: "",
        manager: {
            managerId: "",
            managerName: "",
            managerPassword: "",
            managerEmail: "",
            store: {
                storeId: 0,
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
                    deptId: "",
                    deptCode: "",
                    deptName: ""
                },
                workState: ""
            }
        },
        material: {
            materialId: "",
            materialName: "",
            materialCompany: "",
            materialCompanyCode: "",
            materialManager: "",
            materialContact: "",
            materialPrice: ""
        },
        purchaseCount: "",
        purchaseRequireDate: "",
        purchaseAcceptDate: "",
        purchaseState: "",
        purchasePrice: "",
        purchaseTotalPrice: ""
    });


    // 발주 추가 모달창 열고 닫기
    const openAddPurchaseModal = () => {
        setModalAddPurchaseOpen(true);
    };

    const closeAddPurchaseModal = () => {
        setModalAddPurchaseOpen(false);
    };

    // 발주 상세보기 모달창 열기
    const openDetailPurchaseModal = (purchaseId) => {
        setSelectedPurchaseId(purchaseId);
        setModalDetailPurchaseOpen(true);
    };

    const closeDetailPurchaseModal = () => {
        setModalDetailPurchaseOpen(false);
        setDetailData({
            purchaseId: "",
            manager: {
                managerId: "",
                managerName: "",
                managerPassword: "",
                managerEmail: "",
                store: {
                    storeId: "",
                    storeName: "",
                    storeLatitude: "",
                    storeLongitude: "",
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
                        deptId: "",
                        deptCode: "",
                        deptName: ""
                    },
                    workState: ""
                }
            },
            material: {
                materialId: "",
                materialName: "",
                materialCompany: "",
                materialCompanyCode: "",
                materialManager: "",
                materialContact: "",
                materialPrice: ""
            },
            purchaseCount: "",
            purchaseRequireDate: "",
            purchaseAcceptDate: "",
            purchaseState: "",
            purchasePrice: "",
            purchaseTotalPrice: ""
        });
    };

    // 발주 상세 데이터 API 호출 및 상태 업데이트
    const fetchDetailData = async (purchaseId) => {
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/purchase/selectOnePurchase/${purchaseId}`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log("API Response - detailData:", response.data);
            // 상태 업데이트
            setDetailData(response.data);
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    // selectedPurchaseId가 변경될 때마다 fetchDetailData 호출
    useEffect(() => {
        if (modalDetailPurchaseOpen && selectedPurchaseId !== null) {
            fetchDetailData(selectedPurchaseId);
        }
    }, [modalDetailPurchaseOpen, selectedPurchaseId]);

    return (
        <div className="component-list-container">
            <h1>발주내역</h1>
            {/* 발주 추가 버튼 */}
            <button onClick={openAddPurchaseModal}>발주내역추가</button>
            <AddPurchaseModal isOpen={modalAddPurchaseOpen} onClose={closeAddPurchaseModal} />

            {/* 발주 상세보기 모달 */}
            {modalDetailPurchaseOpen && (
                <DetailPurchaseModal
                    detailData={detailData}
                    isOpen={modalDetailPurchaseOpen}
                    onClose={closeDetailPurchaseModal}
                />
            )}

            {/* 발주 내역 출력 */}
            {data && data.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>매니저명</th>
                            <th>매장명</th>
                            <th>발주상품</th>
                            <th>발주수량</th>
                            <th>발주요청시간</th>
                            <th>발주응답시간</th>
                            <th>발주 상태</th>
                            <th>상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.purchaseId}</td>
                                <td>{item.manager && item.manager.managerName}</td>
                                <td>{item.manager.store && item.manager.store.storeName}</td>
                                <td>{item.material && item.material.materialName}</td>
                                <td>{item.purchaseCount}</td>
                                <td>{item.purchaseRequireDate}</td>
                                <td>{item.purchaseAcceptDate}</td>
                                <td>{item.purchaseState}</td>
                                <td>
                                    {/* 발주 상세 보기 버튼 */}
                                    <button onClick={() => openDetailPurchaseModal(item.purchaseId)}>
                                        상세보기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>데이터가 없습니다.</p>
            )}

        </div>
    );
};

export default PurchaseList;
