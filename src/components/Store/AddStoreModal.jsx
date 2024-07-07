import React, { useState } from "react";
import axios from "axios";

const AddStoreModal = ({ isOpen, onClose }) => {

  const [storeName, setStoreName] = useState(null);
  const [storeAddress, setStoreAddress] = useState(null);
  const [employee, setEmpId] = useState('');
  const [managerName, setManagerName] = useState(null);
  const [managerPassword, setManagerPassword] = useState(null);
  const [managerEmail, setManagerEmail] = useState(null);
  const [managerCreatedAt, setManagerCreatedAt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/v1/intrabucks/manager/storemanage/create', {
        employee: {
          empId: employee,
          empName: "",
          empPassword: "",
          empEmail: "",
          empPhone: "",
          empAddress: "",
          empJoinDate: "",
          empPosition: "",
          deptCode: "",
          workState: ""
        },
        storeName: storeName,
        storeAddress: storeAddress,
        storeClose: "N",
        managerName: managerName,
        managerPassword: managerPassword,
        managerEmail: managerEmail,
        managerCreatedAt: managerCreatedAt
      }
      );
      console.log("200", response.data);
      // 모달 창 닫기
      onClose();
    } catch (error) {
      // 요청 실패
      console.error('Error creating store:', error);
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
          <h1>매장 등록</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>매장 이름</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </div>
            <div>
              <label>매장 주소</label>
              <input
                type="text"
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
              />
            </div>
            <div>
              <label>직원ID</label>
              <input
                type="text"
                value={employee}
                onChange={(e) => setEmpId(e.target.value)}
              />
            </div>
            <div>
              <label>관리자 이름</label>
              <input
                type="text"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
              />
            </div>
            <div>
              <label>관리자 비밀번호</label>
              <input
                type="text"
                value={managerPassword}
                onChange={(e) => setManagerPassword(e.target.value)}
              />
            </div>
            <div>
              <label>관리자 이메일</label>
              <input
                type="email"
                value={managerEmail}
                onChange={(e) => setManagerEmail(e.target.value)}
              />
            </div>
            <div>
              <label>관리자 가입 일자</label>
              <input
                type="text"
                value={managerCreatedAt}
                onChange={(e) => setManagerCreatedAt(e.target.value)}
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

export default AddStoreModal;
