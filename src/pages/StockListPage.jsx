import React from 'react';
import StockList from '../components/Stock/StockList';
import axios from 'axios';
import { useState, useEffect } from 'react';


const StockListPage = () => {

    //API 통신
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/intrabucks/stock/selectStockList');
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