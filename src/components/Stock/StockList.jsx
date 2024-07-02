import React from "react";
import "../../styles/StockList.css";
import { useState, useEffect } from "react";
import AddStockModal from "./AddStockModal";
import DetailStockModal from "./DetailStockModal";
import axios from "axios";


const StockList = ({ data }) => {

    //재고추가 모달 상태 관리
    const [modalAddStockOpen, setModalAddStockOpen] = useState(false);

    const openAddStockModal = () => {
        setModalAddStockOpen(true);
    };

    const closeAddStockModal = () => {
        setModalAddStockOpen(false);
    };


    // 재고 상세보기 모달 상태 관리
    const [modalDetailStockOpen, setModalDetailStockOpen] = useState(false);
    const [selectedStockId, setSelectedStockId] = useState(null);

    //재고 상세보기 API 통신
    const [detailData, setdetailData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/stock/selectOneStock/${selectedStockId}`);
                setdetailData(response.detailData);
            } catch (error) {
                console.log('에러 발생', error);
            }

            fetchData();
        }

    }, []);

    const openDetailStockModal = (stockId, detailData) => {
        setSelectedStockId(stockId, detailData);
        setModalDetailStockOpen(true);
    };

    const closeDetailStockModal = () => {
        setModalDetailStockOpen(false);
    };

    return (

        <div className="stock-list-container">
            <h2>테스트</h2>

            <h2>재고내역</h2>

            <button onClick={openAddStockModal}>재고추가</button>
            <AddStockModal isOpen={modalAddStockOpen} onClose={closeAddStockModal} />

            {/**API 통신 */}
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
                                    <button onClick={() => openDetailStockModal(item.stockId)}>상세보기</button>
                                    <DetailStockModal isOpen={modalDetailStockOpen} onClose={closeDetailStockModal} stockId={selectedStockId} />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>데이터가 없습니다. </p>
            )}


        </div>
    );

}

export default StockList;
