import React, { useState } from "react";
import AddSalesModal from "./AddSalesModal";
import { useNavigate } from 'react-router-dom';

const SalesList = ({ data }) => {
  const navigate = useNavigate();
  const [modalAddSalesOpen, setModalAddSalesOpen] = useState(false);

  const openAddSalesModal = () => {
    setModalAddSalesOpen(true);
  };

  const closeAddSalesModal = () => {
    setModalAddSalesOpen(false);
    alert('매출 정보가 등록되었습니다.');
    navigate(0);
  };

  console.log(data); // 데이터 확인

  return (
    <div className="sales-list-container">
      <h2>매출 내역</h2>
      <button onClick={openAddSalesModal}>매출등록</button>
      <AddSalesModal isOpen={modalAddSalesOpen} onClose={closeAddSalesModal} />
      {data ? (
        <div className="table-wrapper">
          <table className="sales-list">
            <thead>
              <tr>
                <th>매출ID</th>
                <th>매장 이름</th>
                <th>매장 주소</th>
                <th>매출금액</th>
                <th>매출기간</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.salesId}</td>
                  <td>{item.store.storeName}</td>
                  <td>{item.store.storeAddress}</td>
                  <td>{item.salesTotalAmount}</td>
                  <td>{item.salesPri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default SalesList;
