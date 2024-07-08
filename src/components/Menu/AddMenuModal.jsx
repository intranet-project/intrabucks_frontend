import React, { useState } from 'react';
import axios from 'axios';


const AddMenuModal = ({ isOpen, onClose }) => {

    //사용될 값 선언
    const [categoryName, setCategoryName] = useState('');
    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState('');
    const [menuDetail, setMenuDetail] = useState('');
    const [menuImg, setMenuImg] = useState('');

    //등록 버튼 누르면 API 실행
    const handleSubmit = async (e) => {
        //폼 제출 이벤트 방지
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/api/v1/intrabucks/menu/create', {
                // DTO의 변수 중 자료형이 엔티티일 경우,
                categoryName: categoryName,
                menuName: menuName,
                menuPrice: parseInt(menuPrice),
                menuDetail: menuDetail,
                menuImg: menuImg
            }
            );
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
                    <h1>메뉴 등록</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>메뉴명</label>
                            <input
                                type="text"
                                value={menuName}
                                onChange={(e) => setMenuName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>카테고리명</label>
                            <input
                                type="text"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>메뉴 가격</label>
                            <input
                                type="number"
                                value={menuPrice}
                                onChange={(e) => setMenuPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>메뉴 상세</label>
                            <input
                                type="text"
                                value={menuDetail}
                                onChange={(e) => setMenuDetail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>메뉴 이미지</label>
                            <input
                                type="text"
                                value={menuImg}
                                onChange={(e) => setMenuImg(e.target.value)}
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

export default AddMenuModal;
