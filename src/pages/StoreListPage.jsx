import React from 'react';
import StoreList from '../components/Store/StoreList';
import axios from 'axios';
import { useState, useEffect } from 'react';

const StoreListPage = () => {

    //API 통신(List)
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:9000/api/v1/intrabucks/store/list');
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
            {/**매장 List 관련 폼 */}
            <StoreList data={data} />
        </div>
    );
};

export default StoreListPage;