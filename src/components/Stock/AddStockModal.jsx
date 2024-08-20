import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AddStockModal.css';

/**
 * @author 김아현
 * @version 2024-07-01
 * 재고 추가 관련 등록 폼으로, API 통신 및 모달 창 기능 구현
 */

const AddStockModal = ({ isOpen, onClose }) => {

    //사용될 값 선언
    const [material, setMaterialId] = useState('');
    const [stockCount, setStockCount] = useState('');
    const [store, setStoreId] = useState('');

    //등록 버튼 누르면 API 실행
    const handleSubmit = async (e) => {
        //폼 제출 이벤트 방지
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.post('http://localhost:9000/api/v1/intrabucks/stock/createStockItem', {
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
            console.log("200", response.data);

            // 모달 창 닫기
            onClose();
        } catch (error) {
            // 요청 실패
            console.error('에러 발생', error);
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
                    <h1>재고 등록</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>자재 코드</label>
                            <input
                                type="text"
                                value={material}
                                placeholder='자재 id를 입력해주세요 (예: 커피 원두 = 1)'
                                onChange={(e) => setMaterialId(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>재고 수량</label>
                            <input
                                type="number"
                                value={stockCount}
                                placeholder='숫자 형식으로 입력해주세요'
                                min={1}
                                max={100}
                                onChange={(e) => setStockCount(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>매장 코드</label>
                            <input
                                type="text"
                                value={store}
                                placeholder='매장 id를 입력해주세요'
                                onChange={(e) => setStoreId(e.target.value)}
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

export default AddStockModal;
