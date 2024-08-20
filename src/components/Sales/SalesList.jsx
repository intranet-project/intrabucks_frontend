import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SalesList = ({ data }) => {
  const navigate = useNavigate();
  console.log(data); // 데이터 확인

  return (
    <div className="component-list-container">
      <h1>매출 내역</h1>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>매장 이름</th>
              <th>매장 주소</th>
              <th>매출금액</th>
              <th>매출기간</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.storeId.storeName}</td>
                <td>{item.storeId.storeAddress}</td>
                <td>{item.salesAmount}</td>
                <td>{item.salesPri}</td>
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

export default SalesList;
