import React from 'react';
import './App.css';

import SideBar from './components/Layout/SideBar';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import Routers from './components/Routers';


function App() {
  return (
    <div className="container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="main-content">
        <Header />

        <div className="form-section">
          <Routers />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
