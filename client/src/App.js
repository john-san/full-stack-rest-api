import React from 'react';
import Header from './components/Header';
import Courses from './components/Courses';
import './styles/App.css';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <hr />
      
      <Courses />
    </div>
  );
}

export default App;
