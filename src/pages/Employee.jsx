import React from 'react';
import Employee from "../components/Employee/Employee";

const Employee = () => {
    return (
        <div>
      <div>
        <h1>직원등록 페이지</h1>
        <div className="page"></div>
        <div className="page-container">
          <Employee />
        </div>
      </div>
    </div>
  );
};

export default Employee;