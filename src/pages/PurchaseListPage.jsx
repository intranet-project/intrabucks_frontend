import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import PurchaseList from '../components/Purchase/PurchaseList';

/**
 * @author 김아현
 * @version 2024-07-01
 * 재고 List 관련 폼 연결 및 API 통신 구현
 */

const PurchaseListPage = () => {

    //API 통신(List)
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/intrabucks/purchase/selectPurchaseList');
                setData(response.data);
            } catch (error) {
                console.error('에러 발생', error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            {/**발주 List 관련 폼 */}
            <PurchaseList data={data} />
        </div>
    );
};

export default PurchaseListPage;