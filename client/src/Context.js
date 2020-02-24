import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { 
        signIn: this.signIn,
        signOut: this.signOut,
        getCourse: this.getCourse,
        deleteCourse: this.deleteCourse,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse
      }
    };
    
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  // Called by UserSignIn.  Uses Data's getUser() to check if a user exists.
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    // if a user is found, add user to State + set cookie
    if (user !== null) {
      // storing password in context for API calls..
      // TODO: find a more secure way
      user.password = password; 
      this.setState({ authenticatedUser: user });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  // Called by UserSignOut.  Removes user from state & removes cookie.
  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  // called by CourseDetail & UpdateCourse
  getCourse = async (id) => {
    const currentCourse = await this.data.getCourse(id);
    return currentCourse;
  }

  // called by CreateCourse
  createCourse = async (course, emailAddress, password) => {
    const newCourse = await this.data.createCourse(course, emailAddress, password);
    return newCourse;
  }

  // called by UpdateCourse
  updateCourse = async (course, emailAddress, password) => {
    const updatedCourse = await this.data.updateCourse(course, emailAddress, password);
    return updatedCourse;
  }

  // called by CourseDetail
  deleteCourse = async (id, emailAddress, password) => {
    const response = await this.data.deleteCourse(id, emailAddress, password);
    return response;
  }
}

export const Consumer = Context.Consumer;

// returns Component wrapped by Context Consumer so Component has access to Context.
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

