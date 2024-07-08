import React, { useState, useEffect } from "react";
import AddMenuModal from "./AddMenuModal";
import DetailMenuModal from "./DetailMenuModal";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const MenuList = ({ data }) => {
    const navigate = useNavigate();

    const [modalAddMenuOpen, setModalAddMenuOpen] = useState(false);
    const [modalDetailMenuOpen, setModalDetailMenuOpen] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [detailData, setDetailData] = useState({
        menuId: "",
        categoryName: "",
        menuName: "",
        menuPrice: "",
        menuDetail: "",
        menuImg: ""
});

    // 메뉴 추가 모달창 열고 닫기
    const openAddMenuModal = () => {
        setModalAddMenuOpen(true);
    };

    const closeAddMenuModal = () => {
        setModalAddMenuOpen(false);
        alert('메뉴 정보가 등록되었습니다.');
        navigate(0);
    };

    // 메뉴 상세보기 모달창 열기
    const openDetailMenuModal = (menuId) => {
        setSelectedMenuId(menuId);
        setModalDetailMenuOpen(true);
    };

    const closeDetailMenuModal = () => {
        setModalDetailMenuOpen(false);
        setDetailData({
            menuId: "",
            categoryName: "",
            menuName: "",
            menuPrice: "",
            menuDetail: "",
            menuImg: ""
        });
    };

    // 재고 상세 데이터 API 호출 및 상태 업데이트
    const fetchDetailData = async (menuId) => {
        console.log("fetchDetailData - menuId:", menuId);
        try {
            const response = await axios.get(`http://localhost:9000/api/v1/intrabucks/menu/read/${menuId}`);
            console.log("API Response - detailData:", response.data);
            setDetailData(response.data); // 상태 업데이트
        } catch (error) {
            console.error("에러 발생", error);
        }
    };

    // selectedMenuId가 변경될 때마다 fetchDetailData 호출
    useEffect(() => {
        if (modalDetailMenuOpen && selectedMenuId !== null) {
            fetchDetailData(selectedMenuId);
        }
    }, [modalDetailMenuOpen, selectedMenuId]);

    return (
        <div className="menu-list-container">
            <h2>메뉴 목록</h2>
            {/* 메뉴 등록 버튼 */}
            <button onClick={openAddMenuModal}>메뉴 등록</button>
            <AddMenuModal isOpen={modalAddMenuOpen} onClose={closeAddMenuModal} />

            {/* 메뉴 상세보기 모달 */}
            {modalDetailMenuOpen && (
                <DetailMenuModal
                    detailData={detailData}
                    isOpen={modalDetailMenuOpen}
                    onClose={closeDetailMenuModal}
                />
            )}

            {/* 재고 내역 출력 */}
            {data ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>메뉴명</th>
                            <th>카테고리</th>
                            <th>가격</th>
                            <th>상세보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.menuId}</td>
                                <td>{item.menuName}</td>
                                <td>{item.categoryName}</td>
                                <td>{item.menuPrice}</td>
                                <td>
                                    {/* 메뉴 상세 보기 버튼 */}
                                    <button onClick={() => openDetailMenuModal(item.menuId)}>
                                        상세보기
                                    </button>
                                </td>
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

export default MenuList;
