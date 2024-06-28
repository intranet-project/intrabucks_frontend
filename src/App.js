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
import './App.css';
import Sidebar from './components/Sidebar';
import Employee from './components/Employee';
import EmployeeList from './components/EmployeeList';
import EmployeeUpdate from './components/EmployeeUpdate';
import Quitter from './components/Quitter';
import QuitterList from './components/QuitterList';
import QuitterUpdate from './components/QuitterUpdate';

function App() {
  return (
    <div className="container">
      <Sidebar />
      <main className="main-content">
        <header>
          <input type="text" placeholder="통합검색" />
          <button>🔍</button>
          <button>❔</button>
          <button>🔍</button>
        </header>
        <section className="form-section">
          {/* <h2>직원등록</h2>
          <Employee/> */}
         
          {/* <h2>신규목록</h2>
          <EmployeeList/> */}

          {/* <h2>신규수정</h2>  
          <EmployeeUpdate/> */}

          {/* <h2>퇴사자등록</h2>
          <Quitter/> */}

          {/* <h2>퇴사자목록</h2>
          <QuitterList/> */}

          <h2>퇴사자수정</h2>
          <QuitterUpdate/>


        </section>
      </main>
    </div>
  );
}

export default App;
