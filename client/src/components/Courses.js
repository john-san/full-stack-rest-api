import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import CourseList from './subcomponents/CourseList';
import NewCourseButton from './subcomponents/NewCourseButton';

class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    }

    this.getCourses();
  }

  async getCourses() {
    const { data } = await axios(config.apiBaseUrl + "/courses");
    this.setState({ courses: data });
  }
  
  render() {
    const { courses } = this.state;
    const { authenticatedUser } = this.props.context;

    return (
      <div className="bounds">
        <CourseList courses={courses} />
        <NewCourseButton authenticatedUser={authenticatedUser} />
      </div>
    );
  }
  
}

export default Courses;