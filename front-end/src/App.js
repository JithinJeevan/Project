import React, { useState } from 'react';
import './App.css';
import './components/Enroll';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Enroll2 from './components/Enroll2';
import Login from './components/signup/login';
import { AppBar, Toolbar } from '@mui/material';
import AdminHome from './components/admin/AdminHome';

function App() {

 
  return (
    <div className="App">
      <div className='nav'>
      <nav>
      <h1>Hi</h1>
      <a href='/login'>Login</a>
      <a href='/enroll'>Enroll</a>
      
      
        </nav>
   
      </div>
     
     
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/enroll' element={<Enroll2/>}/>
          <Route path='/admin/:id' element={<AdminHome/>}/>
        </Routes>
      </Router>
     
      
    
    </div>
  );
}

export default App;
