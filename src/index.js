import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Pages/Index/index';
import Navbar from './Pages/NavBar/Navbar';
import { BrowserRouter as Router, Route, Routes, Link, BrowserRouter } from 'react-router-dom';
import Employee from './Pages/Employees Log/Employee';
import Visitor from './Pages/Visitors Log/visitor';
import View from './Pages/Employees Log/View';
import Rooms from './Pages/Rooms/Rooms';
import Borlog from './Pages/Rooms/Borlog';
import CrudeR from './Pages/Admin/Rooms/CrudeR';
import CrudeE from './Pages/Admin/Employee/CrudeE';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee" element={<Employee/>} />
          <Route path="/visitor" element={<Visitor/>} />
          <Route path="/emplog" element={<View/>} />
          <Route path="/rooms" element={<Rooms/>} />
          <Route path="/borlog" element={<Borlog/>} />
          <Route path="/cruder" element={<CrudeR/>} />
          <Route path="/crude" element={<CrudeE/>} />
        </Routes>

      </Router>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
