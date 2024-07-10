import React from 'react';
import Department from "../components/Department/Department";

const Department = () => {
    return (
        <div>
        <div>
          <h1>부서등록 페이지</h1>
          <div className="page"></div>
          <div className="page-container">
            <Department />
          </div>
        </div>
      </div>
    );
};

export default Department;