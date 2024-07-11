import React from "react";
import "../../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <header className="header">
        <h1>홈 페이지</h1>
      </header>
      <main className="main">
        <div className="content box1">
          <p>1</p>
        </div>
        <div className="content box2">
          <p>2</p>
        </div>
        <div className="content box3">
          <p>3</p>
        </div>
        <div className="content box4">
          <p>4</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
