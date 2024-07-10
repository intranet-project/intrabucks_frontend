import React from 'react';
import EmployeeUpdate from "../components/Employee/EmployeeUpdate";

const EmployeeUpdate = () => {
    return (
        <div>
      <div>
        <h1>직원정보수정 페이지</h1>
        <div className="page"></div>
        <div className="page-container">
          <EmployeeUpdate />
        </div>
      </div>
    </div>
  );
};

export default EmployeeUpdate;