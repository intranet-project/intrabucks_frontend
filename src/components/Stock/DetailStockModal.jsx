import React from 'react';
import axios from 'axios';

const DetailStockModal = ({ stockId, detailData, isOpen, onClose }) => {

    const modifyStock = () => {

    }


    const deleteStock = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.delete(`http://localhost:9000/api/v1/intrabucks/stock/deleteOneStock/${stockId}`);
            console.log("삭제 완료", response.data);

            onClose();
        } catch (error) {
            console.error('삭제 실패', error);
        }
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    {/** 상세보기 창 취소 버튼 */}
                    <span className="close" onClick={handleCancel}>&times;</span>
                    <h1>재고 상세보기</h1>

                    {/** 수정하기 값 전송 */}
                    <form onSubmit={modifyStock}>
                        <div>
                            <label>자재 코드</label>
                            {stockId}
                        </div>
                        <div>
                            <label>재고 수량</label>
                            {stockId}
                        </div>
                        <div>
                            <label>매장 코드</label>
                            {stockId}
                        </div>
                        <button type='submit'>수정</button>
                    </form>

                    <div>
                        <button onClick={deleteStock}>삭제</button>
                        <button onClick={handleCancel}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailStockModal;
