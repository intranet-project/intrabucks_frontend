import React from "react";
import "../../styles/Home.css";
import BoardList from "../Board/BoardList";
import useCalendar from "../../hooks/UseCalendar"; // Ensure correct import path based on your project

const Home = () => {
  const {
    selectedYear,
    selectedMonth,
    setSelectedYear,
    setSelectedMonth,
    selectedDate,
    prevMonth,
    nextMonth,
    returnWeek,
    returnDay,
  } = useCalendar(); // Ensure useCalendar hook is correctly imported and used

  return (
    <div className="home">
      <header className="header">
        <h1>홈 페이지</h1>
      </header>
      <main className="main">
        <div className="content box2">
          <div className="widget">
            <h3>달력</h3>
            {/* 달력 위젯 제목 */}
            <div className="calendar">
              <div className="calendar-header">
                <h3>{`${selectedYear}년 ${selectedMonth}월`}</h3>{" "}
                {/* 선택된 연도와 월 표시 */}
                <div className="buttons">
                  <button className="calendar-button" onClick={() => prevMonth()}>
                    이전
                  </button>{" "}
                  {/* Previous month button */}
                  <button className="calendar-button" onClick={() => nextMonth()}>
                    다음
                  </button>{" "}
                  {/* Next month button */}
                </div>
              </div>
              <div className="calendar-body">
                <div className="week">{returnWeek()}</div>{" "}
                {/* 요일 표시 */}
                <div className="days">{returnDay()}</div>{" "}
                {/* 날짜 버튼 표시 */}
              </div>
            </div>
          </div>
        </div>
        <div className="content box3">
          <BoardList />
        </div>
        
      </main>
    </div>
  );
};

export default Home;
