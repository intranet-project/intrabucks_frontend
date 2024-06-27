import React from 'react';
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

export default App;