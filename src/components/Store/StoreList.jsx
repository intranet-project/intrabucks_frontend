import React, { useState, useEffect } from "react";
import AddStoreModal from "./AddStoreModal";
import DetailStoreModal from "./DetailStoreModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreList = ({ data }) => {
  const navigate = useNavigate();
  const [modalAddStoreOpen, setModalAddStoreOpen] = useState(false);
  const [modalDetailStoreOpen, setModalDetailStoreOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);

  const [detailData, setDetailData] = useState({
    managerId: "",
    managerName: "",
    managerPassword: "",
    managerEmail: "",
    store: {
      storeId: "",
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
});

  const openAddStoreModal = () => {
    setModalAddStoreOpen(true);
  };

  const closeAddStoreModal = () => {
    setModalAddStoreOpen(false);
    navigate(0);
  };

  const openDetailStoreModal = (storeId) => {
    setSelectedStoreId(storeId);
    setModalDetailStoreOpen(true);
  };

  const closeDetailStoreModal = () => {
    setModalDetailStoreOpen(false);
    setDetailData({
      managerId: "",
      managerName: "",
      managerPassword: "",
      managerEmail: "",
      store: {
        storeId: "",
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
        deptCode: "",
        workState: ""
      }
    });
  };

  const fetchDetailData = async (storeId) => {
    try {
      const token = sessionStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/manager/storemanage/read/${storeId}`, {
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

// selectedStoreId가 변경될 때마다 fetchDetailData 호출
  useEffect(() => {
    if (modalDetailStoreOpen && selectedStoreId !== null) {
      fetchDetailData(selectedStoreId);
    }
  }, [modalDetailStoreOpen, selectedStoreId]);

  console.log(data); // 데이터 확인

  return (
    <div className="store-list-container">
      <h2>매장 목록</h2>
      <button onClick={openAddStoreModal}>매장 등록</button>
      <AddStoreModal isOpen={modalAddStoreOpen} onClose={closeAddStoreModal} />

      {modalDetailStoreOpen && (
        <DetailStoreModal
          detailData={detailData}
          isOpen={modalDetailStoreOpen}
          onClose={closeDetailStoreModal}
        />
      )}

      {data ? (
        <div className="table-wrapper">
          <table className="store-list">
            <thead>
              <tr>
                <th>매장ID</th>
                <th>매장 이름</th>
                <th>매장 주소</th>
                <th>폐점여부</th>
                <th>매장 등록일자</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.storeId}</td>
                  <td>{item.storeName}</td>
                  <td>{item.storeAddress}</td>
                  <td>{item.storeClose}</td>
                  <td>{item.storeCreatedAt}</td>
                  <td>
                    <button onClick={() => openDetailStoreModal(item.storeId)}>
                      상세보기
                    </button>
                  </td>
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

export default StoreList;
