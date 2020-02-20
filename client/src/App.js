import React from 'react';
import CourseList from './components/CourseList';
import './styles/App.css';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch
// } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <h1>React App</h1>

      <CourseList />
    </div>
  );
}

export default App;
