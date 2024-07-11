import React from 'react';
import Board from "../components/Board/Board";

const BoardPage = () => {
    return (
        <div>
        <div>
          <h1>게시물등록 페이지</h1>
          <div className="page"></div>
          <div className="page-container">
            <Board />
          </div>
        </div>
      </div>
    );
};

export default BoardPage;