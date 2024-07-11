import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMenuModal = ({ data, isOpen, onClose }) => {
    console.log("EditStockModal test", data)

    //사용될 값 선언
    const [editData, setEditData] = useState(data);

    //등록 버튼 누르면 API 실행
    const handleEditSubmit = async (e) => {
        //폼 제출 이벤트 방지
        e.preventDefault();
        try {
            const token = sessionStorage.getItem('jwt');
            const response = await axios.put(`http://localhost:9000/api/v1/intrabucks/menu/update/${data.menuId}`, {
                // DTO의 변수 중 자료형이 엔티티일 경우,
                menuId: editData.menuId,
                categoryName: editData.categoryName,
                menuName: editData.menuName,
                menuPrice: editData.menuPrice,
                menuDetail: editData.menuDetail,
                menuImg: editData.menuImg},
                {headers: {
                    'Authorization': token
                }
            });
            console.log("수정 완료:", response.data);
            alert('메뉴 정보가 수정되었습니다.');
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
                    <h1>메뉴 수정하기</h1>

                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>메뉴ID</label>
                            <p aria-readonly="true">{editData.menuId}</p>
                        </div>

                        <div>
                            <label>메뉴명</label>
                            <input
                                type="text"
                                name="menuName"
                                value={editData.menuName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label>카테고리명</label>
                            <input
                                type="text"
                                name="categoryName"
                                value={editData.categoryName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>메뉴 가격</label>
                            <input
                                type="number"
                                name="menuPrice"
                                value={editData.menuPrice}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>메뉴 상세</label>
                            <input
                                type="text"
                                name="menuDetail"
                                value={editData.menuDetail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>메뉴 이미지</label>
                            <input
                                type="text"
                                name="menuImg"
                                value={editData.menuImg}
                                onChange={handleChange}
                                required
                            />
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

export default EditMenuModal;
