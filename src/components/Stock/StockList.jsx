import React, { useState, useEffect } from "react";
import "../../styles/StockList.css";
import AddStockModal from "./AddStockModal";
import DetailStockModal from "./DetailStockModal";
import axios from "axios";


/**
 * @author 김아현
 * @version 2024-07-02
 * 재고 관련 내역 폼으로, API 통신 및 모달 창 기능 구현
 */

const StockList = ({ data }) => {
    const [modalAddStockOpen, setModalAddStockOpen] = useState(false);
    const [modalDetailStockOpen, setModalDetailStockOpen] = useState(false);
    const [selectedStockId, setSelectedStockId] = useState(null);
    const [detailData, setDetailData] = useState({
        material: {
            materialId: '',
            materialName: "",
            material_company: "",
            materialCompanyCode: "",
            materialManager: "",
            materialContact: "",
            materialPrice: 0,
        },
        stockCount: '',
        store: {
            storeId: '',
            storeName: "",
            storeLatitude: 0,
            storeLongitude: 0,
            storeAddress: "",
            storeCreatedAt: "",
            storeClose: "",
        },
    });

    // 재고 추가 모달창 열고 닫기
    const openAddStockModal = () => {
        setModalAddStockOpen(true);
    };

    const closeAddStockModal = () => {
        setModalAddStockOpen(false);
    };

    // 재고 상세보기 모달창 열기
    const openDetailStockModal = (stockId) => {
        setSelectedStockId(stockId);
        setModalDetailStockOpen(true);
    };

    const closeDetailStockModal = () => {
        setModalDetailStockOpen(false);
        setDetailData({
            material: {
                materialId: '',
                materialName: "",
                material_company: "",
                materialCompanyCode: "",
                materialManager: "",
                materialContact: "",
                materialPrice: 0,
            },
            stockCount: '',
            store: {
                storeId: '',
                storeName: "",
                storeLatitude: 0,
                storeLongitude: 0,
                storeAddress: "",
                storeCreatedAt: "",
                storeClose: "",
            },
        });
    };

    // 재고 상세 데이터 API 호출 및 상태 업데이트
    const fetchDetailData = async (stockId) => {
        console.log("fetchDetailData - stockId:", stockId);
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/stock/selectOneStock/${stockId}`, {
                headers: {
                    'Authorization': token
                }
            });
            console.log("API Response - detailData:", response.data);
            setDetailData(response.data); // 상태 업데이트
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    // selectedStockId가 변경될 때마다 fetchDetailData 호출
    useEffect(() => {
        if (modalDetailStockOpen && selectedStockId !== null) {
            fetchDetailData(selectedStockId);
        }
    }, [modalDetailStockOpen, selectedStockId]);

    return (
        <div className="stock-list-container">
            <h2>재고내역</h2>
            {/* 재고 추가 버튼 */}
            <button onClick={openAddStockModal}>재고추가</button>
            <AddStockModal isOpen={modalAddStockOpen} onClose={closeAddStockModal} />

            {/* 재고 상세보기 모달 */}
            {modalDetailStockOpen && (
                <DetailStockModal
                    detailData={detailData}
                    isOpen={modalDetailStockOpen}
                    onClose={closeDetailStockModal}
                />
            )}

            {/* 재고 내역 출력 */}
            {data ? (
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>재고명</th>
                            <th>보유수량</th>
                            <th>상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.stockId}</td>
                                <td>{item.material.materialName}</td>
                                <td>{item.stockCount}</td>
                                <td>
                                    {/* 재고 상세 보기 버튼 */}
                                    <button onClick={() => openDetailStockModal(item.stockId)}>
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

export default StockList;
