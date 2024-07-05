import React, { useEffect, useState } from "react";
import axios from "axios";

const ApiTest = ({ stockId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${stockId}`);
                setData(response.data);
            } catch (error) {
                console.error('에러 발생', error);
            }
        };

        fetchData();

    }, [stockId]); // stockId가 변경될 때마다 API 재요청

    // data가 null인 경우를 처리하기 위해 조건부 렌더링을 사용합니다.
    return (
        <div>
            {data && (
                <>
                    <p>UserID: {data.userId}</p>
                    <p>ID: {data.id}</p>
                    <p>Title: {data.title}</p>
                    <p>Completed: {data.completed ? 'Yes' : 'No'}</p>
                </>
            )}
        </div>
    );
};

export default ApiTest;
