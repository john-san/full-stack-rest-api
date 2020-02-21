import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import NotFound from './components/NotFound';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <hr />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/new" component={CreateCourse} />
          <Route path="/courses/:id" component={CourseDetail} />
          
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
