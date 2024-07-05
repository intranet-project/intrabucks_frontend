import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Sales = () => {
  const initialFormData = {
    storeId: storeId,
    storeName: "",
    storeLatitude: 0,
    storeLongitude: 0,
    storeAddress: "",
    storeCreatedAt: "",
    storeClose: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다.

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createStore = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/intrabucks/manager/storemanage/create",
        formData
      );
      console.log("Response from server:", response.data);
      alert("매장이 등록되었습니다.");
      navigate("/stock-list");
    } catch (error) {
      console.error("Error creating sales:", error);
      alert("매장 ID를 확인하세요.");
    }
  };

  const cancel = () => {
    if (window.confirm("취소하시겠습니까?")) {
      setFormData(initialFormData); // 폼 데이터 초기화
      navigate("/stock-list");
    }
  };

  return (
    <div className="stock-form-container">
      <h2>매출 등록</h2>
      <form id="stock-form">
        <div className="form-group">
          <label htmlFor="salesId">매출ID</label>
          <input
            type="text"
            id="salesId"
            name="salesId"
            readOnly
            value={formData["salesId"]}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="storeId">매장ID</label>
          <input
            type="text"
            id="storeId"
            name="storeId"
            value={formData["storeId"]}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salesTotalAmount">매출금액</label>
          <input
            type="text"
            id="salesTotalAmount"
            name="salesTotalAmount"
            value={formData["salesTotalAmount"]}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="salesPri">매출기간</label>
          <input
            type="date"
            id="salesPri"
            name="salesPri"
            value={formData["salesPri"]}
            onChange={handleChange}
          />
        </div>
        <div className="buttons">
          <button type="button" onClick={createSales}>
            등록
          </button>
          <button type="button" onClick={cancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Sales;
