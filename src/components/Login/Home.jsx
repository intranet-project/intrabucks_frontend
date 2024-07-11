import React from "react";
import "../../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <h1>홈 페이지</h1>
      </header>
      <main className="main">
        <div className="content">
          <p>여기는 우리 회사의 홈 페이지입니다.</p>
          <p>다양한 내용을 추가하여 인트라넷을 구축할 수 있습니다.</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
