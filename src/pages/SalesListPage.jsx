import React from 'react';
import SalesList from '../components/Sales/SalesList';
import axios from 'axios';
import { useState, useEffect } from 'react';

const SalesListPage = () => {

    //API 통신(List)
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('jwt');
                const response = await axios.get('http://localhost:9000/api/v1/intrabucks/sales/list', {
                    headers: {
                        'Authorization': token
                    }
                });
                console.log('================response.data-===================', response.data);
                setData(response.data);
            } catch (error) {
                console.error('에러 발생', error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            {/**매출 List 관련 폼 */}
            <SalesList data={data} />
        </div>
    );
};

export default SalesListPage;