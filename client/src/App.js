import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

import withContext from './Context';
import './styles/App.css';

const HeaderWithContext = withContext(Header);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const UserSignUpWithContext = withContext(UserSignUp);

const App = () => {
  return (
    <Router>
      <div className="App">
        <HeaderWithContext />
        <hr />

        <Switch>
          <Route exact path="/" component={Courses} />
          <Route exact path="/courses/new" component={CreateCourse} />
          <Route path="/courses/:id/view" component={CourseDetail} />
          <Route path="/courses/:id/update" component={UpdateCourse} />

          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
