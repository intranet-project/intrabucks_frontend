/* import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Test from './components/Test';
import Test2 from './components/Test2';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/test2" element={<Test2 />} />
    </Routes>
  )

};

export default App; */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import EmployeeList from './components/Employee/EmployeeList';
import Employee from './components/Employee/Employee';
import Department from './components/Department/Department';
import QuitterList from './components/Quitter/QuitterList';
import Quitter from './components/Quitter/Quitter';
import SideBar from './components/Layout/SideBar';
import DepartmentUpdate from './components/Department/DepartmentUpdate';
import EmployeeUpdate from './components/Employee/EmployeeUpdate';
import QuitterUpdate from './components/Quitter/QuitterUpdate';



function App() {
  return (

      <div className="container">
        <SideBar />
        <main className="main-content">
          <Routes>
            <Route path="/employee-list" element={<EmployeeList />} />
            <Route path="/employee-update" element={<EmployeeUpdate />} />
            <Route path="/employee" element={<Employee />} /> {/* Employee.jsx의 라우트 */}
            <Route path="/department" element={<Department />} />
            <Route path="/department-update" element={<DepartmentUpdate />} />
            <Route path="/quitterList" element={<QuitterList />} />
            <Route path="/quitter-update" element={<QuitterUpdate />} /> 
            <Route path="/quitter" element={<Quitter />} />
            {/* 다른 Route들 추가 */}
          </Routes>
        </main>
      </div>

  );
}

export default App;
