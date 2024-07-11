import React from 'react';
import BoardUpdate from "../components/Board/BoardUpdate";
const BoardUpdatePage = () => {
    return (
        <div>
        <div>
          <h1>게시물수정 페이지</h1>
          <div className="page"></div>
          <div className="page-container">
            <BoardUpdate />
          </div>
        </div>
      </div>
    );
};

export default BoardUpdatePage;