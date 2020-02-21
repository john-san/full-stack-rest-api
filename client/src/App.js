import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
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
          <Route path="/courses/view/:id" component={CourseDetail} />
          <Route path="/courses/update/:id" component={UpdateCourse} />

          <Route path="/signin" component={UserSignIn} />
          <Route path="/signup" component={UserSignUp} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
