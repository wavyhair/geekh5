/*
 * @Author: chenjie
 * @Date: 2022-07-05 20:28:09
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-09 20:56:58
 * @FilePath: \react-geekh5-ts\src\App.tsx
 * @Description: App
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/Login';
import './App.scss';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
