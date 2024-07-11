import React from 'react';
import BoardList from "../components/Board/BoardList";

const BoardListPage = () => {
    return (
        <div>
        <div>
          <h1>협업게시판</h1>
          <div className="page"></div>
          <div className="page-container">
            <BoardList />
          </div>
        </div>
      </div>
    );
};

export default BoardListPage;