import React, { useState, useEffect } from 'react';
import '../../styles/AddStockModal.css';
import axios from 'axios';

/**
 * @version 2024-07-02
 * 재고 수정 폼으로, 수정 API 호출 및 데이터 전송
 */

const EditStockModal = ({ data, isOpen, onClose }) => {
    console.log("EditStockModal test", data)

    //사용될 값 선언
    const [material, setMaterialId] = useState('');
    const [stockCount, setStockCount] = useState('');
    const [store, setStoreId] = useState('');
    const [editData, setEditData] = useState(data);

    //등록 버튼 누르면 API 실행
    const handleEditSubmit = async (e) => {
        //폼 제출 이벤트 방지
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/stock/updateStockItem/${data.stockId}/${editData.stockCount}`, {
                // DTO의 변수 중 자료형이 엔티티일 경우,
                material: {
                    materialId: material,
                    materialName: "",
                    material_company: "",
                    materialCompanyCode: "",
                    materialManager: "",
                    materialContact: "",
                    materialPrice: 0,
                },
                // DTO의 변수 중 자료형이 int인 경우,
                stockCount: parseInt(stockCount),
                store: {
                    storeId: store,
                    storeName: "",
                    storeLatitude: 0,
                    storeLongitude: 0,
                    storeAddress: "",
                    storeCreatedAt: "",
                    storeClose: "",
                }
            }, {
                headers: {
                    'Authorization': token
                }
            });
            console.log("수정 완료:", response.data);
            // 수정 후 모달 닫기
            onClose();
        } catch (error) {
            // 요청 실패
            console.error("에러 발생", error);
        }
    };


    useEffect(() => {
        setEditData(data);
    }, [data]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData({
            ...editData,
            [name]: value,
        });
    };

    // 모달 열리고, 데이터 넘어온 상태 체크
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h1>재고 수정하기</h1>

                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>자재코드</label>
                            <p aria-readonly="true">{editData.material && editData.material.materialId}</p>
                        </div>

                        <div>
                            <label>재고수량</label>
                            <input
                                type="number"
                                name="stockCount"
                                value={editData.stockCount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>매장코드</label>
                            <p aria-readonly="true">{editData.store && editData.store.storeId}</p>
                        </div>

                        <div>
                            <button type="submit">저장</button>
                            <button type="button" onClick={onClose}>취소</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditStockModal;
