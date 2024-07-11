import React from 'react';
import EmployeeList from "../components/Employee/EmployeeList";

const EmployeeListPage = () => {
    return (
        <div>
      <div>
        <h1>직원목록 페이지</h1>
        <div className="page"></div>
        <div className="page-container">
          <EmployeeList />
        </div>
      </div>
    </div>
  );
};

export default EmployeeListPage;