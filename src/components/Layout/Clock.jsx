import React, { useState, useEffect } from "react";
import "../../styles/Layout/Clock.css";

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const updateTime = () => {
            setTime(new Date());
        };

        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="clock_Cls">
            <h2>현재 날짜</h2>
            <p>{time.toLocaleDateString()}</p>
            <br></br>
            <br></br>
            <h2>현재 시간</h2>
            <p>{time.toLocaleTimeString()}</p>
        </div>
    );
};

export default Clock;
