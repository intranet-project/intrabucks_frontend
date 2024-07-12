import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import '../styles/Calender.css';

const useCalendar = () => {
  const today = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
  };

  //캘린더 생성
  const [selectedYear, setSelectedYear] = useState(today.year);
  const [selectedMonth, setSelectedMonth] = useState(today.month);
  const [selectedDate, setSelectedDate] = useState("");
  const [holidays, setHolidays] = useState([]);

  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const lastDay = new Date(selectedYear, selectedMonth, 0).getDate();

  const prevMonth = useCallback(() => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  }, [selectedMonth, selectedYear]);

  const nextMonth = useCallback(() => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  }, [selectedMonth, selectedYear]);

  const returnWeek = useCallback(() => {
    return week.map((v, i) => (
      <div
        key={i}
        className={v === "일" ? "weekday sunday" : v === "토" ? "weekday saturday" : "weekday"}
      >
        {v}
      </div>
    ));
  }, []);

  

  //공공데이터 api
  useEffect(() => {
    const fetchHolidays = async () => {
     const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${selectedYear}&solMonth=${selectedMonth}&ServiceKey=1IyAnM38e69iJPC7EteYgGm5QRz%2B0HsSiSSrOKRllvoh5lgzavzGjs1kwCieQi4tL8P4HmZkhr1EhvJvmgU4Ew%3D%3D`;
      console.log("API URL:", url);

      try {
        const response = await axios.get(url);
        console.log("API Response:", response.data);

        if (response.data && response.data.response && response.data.response.body && response.data.response.body.items) {
          const { data } = response.data.response.body.items;
          
          if (data && data.item) {
            const holidaysArray = Array.isArray(data.item) ? data.item : [data.item];
            setHolidays(holidaysArray);
          } else {
            setHolidays([]);
          }
        } else {
          console.error("Invalid API response structure:", response.data);
          setHolidays([]);
        }
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setHolidays([]);
      }
    };

    fetchHolidays();

  }, [selectedYear, selectedMonth]);

  //휴일 표시
  const returnDay = useCallback(() => {
    let dayArr = [];

    for (const today of week) {
      const day = new Date(selectedYear, selectedMonth - 1, 1).getDay();
      if (week[day] === today) {
        for (let i = 1; i <= lastDay; i++) {
          const isHolidayClass = isHoliday(i) ? " holiday" : "";
          dayArr.push(
            <button
              key={i}
              className={`calendar-day${isHolidayClass}`}
              onClick={() => setSelectedDate(`${selectedYear}년 ${selectedMonth}월 ${i}일`)}
            >
              {i}
            </button>
          );
        }
      } else {
        dayArr.push(<div key={today} className="weekday"></div>);
      }
    }
    return dayArr;
  }, [selectedYear, selectedMonth, lastDay, holidays]);

  const isHoliday = useCallback((day) => {
    const holidayDates = holidays.map((holiday) => parseInt(holiday.locdate.substring(6, 8)));
    return holidayDates.includes(day);
  }, [holidays]);



  return {
    selectedYear,
    selectedMonth,
    setSelectedYear,
    setSelectedMonth,
    selectedDate,
    prevMonth,
    nextMonth,
    returnWeek,
    returnDay,
  };
};

export default useCalendar;