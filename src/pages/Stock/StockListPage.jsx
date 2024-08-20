import React from 'react';
import StockList from '../../components/Stock/StockList';
import axios from 'axios';
import { useState, useEffect } from 'react';

/**
 * @author 김아현
 * @version 2024-07-01
 * @version2 2024-07-15
 * 재고 List 관련 폼 연결 및 API 통신 구현
 */

const StockListPage = () => {

    //API 통신(List)
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('jwt');
                const response = await axios.get('http://localhost:9000/api/v1/intrabucks/stock/selectStockList', {
                    headers: {
                        'Authorization': token
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('에러 발생', error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            <StockList data={data} />
        </div>

    );
};

export default StockListPage;