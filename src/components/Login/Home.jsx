import React from "react";
import "../../styles/Home/Home.css";
import ApprovalGet from "../Approval/ApprovalGet";
import BoardPage from "../../pages/Board/BoardPage";
import Calendar from "react-calendar";
import Clock from "../Layout/Clock";
import LunchImage from "../../Lunch.jpg";


const Home = () => {
  return (
    <div className="home-container">

      <div className="board-list-container">
        <BoardPage />
      </div>

      <div className="approval-get-container">
        <ApprovalGet />
      </div>

      <div className="empty-container">
        <Calendar />
      </div>

      <div className="empty-container">
        <Clock />
      </div>

      {/** 추가 */}
      <div className="empty-container">

      </div>

      <div className="empty-container">
        <img src={LunchImage} />
      </div>


    </div>
  );
};

export default Home;
