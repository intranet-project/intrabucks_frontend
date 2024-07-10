import React from 'react';
import QuitterList from "../components/Quitter/QuitterList";

const QuitterList = () => {
    return (
        <div>
      <div>
        <h1>퇴사자목록 페이지</h1>
        <div className="page"></div>
        <div className="page-container">
          <QuitterList />
        </div>
      </div>
    </div>
  );
};

export default QuitterList;