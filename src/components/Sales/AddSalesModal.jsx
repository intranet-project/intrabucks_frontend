import React, { useState } from "react";
import axios from "axios";

const AddSalesModal = ({ isOpen, onClose }) => {

  const [store, setStoreId] = useState('');
  const [salesTotalAmount, setSalesTotalAmount] = useState('');
  const [salesPri, setSalesPri] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Store ID:", store); // 디버깅을 위한 로그 추가
    console.log("Sales Total Amount:", salesTotalAmount);
    console.log("Sales Period:", salesPri);
    try {
      const response = await axios.post('http://localhost:9000/api/v1/intrabucks/sales/create', {
        store: {
          storeId: store,
          storeName: "",
          storeLatitude: 0,
          storeLongitude: 0,
          storeAddress: "",
          storeCreatedAt: "",
          storeClose: "",
        },
        salesTotalAmount: salesTotalAmount,
        salesPri: salesPri
      }
      );
      console.log("200", response.data);
      alert('매출 정보가 등록되었습니다.');
      // 모달 창 닫기
      onClose();
    } catch (error) {
      // 요청 실패
      console.error('Error creating sales:', error);
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
          <h1>매출 등록</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>매장ID</label>
              <input
                type="text"
                value={store}
                onChange={(e) => setStoreId(e.target.value)}
              />
            </div>
            <div>
              <label>매출금액</label>
              <input
                type="number"
                value={salesTotalAmount}
                onChange={(e) => setSalesTotalAmount(e.target.value)}
              />
            </div>
            <div>
              <label>매출기간</label>
              <input
                type="text"
                value={salesPri}
                onChange={(e) => setSalesPri(e.target.value)}
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

export default AddSalesModal;
