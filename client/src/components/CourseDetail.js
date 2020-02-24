import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import CourseActionsBar from './subcomponents/CourseActionsBar';
import CourseDetailBody from './subcomponents/CourseDetailBody';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentCourse: {},
      currentCourseOwner: {}
    }

    this.getCourse();
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  async getCourse() {
    try {
      const { id } = this.props.match.params;
      const { context } = this.props;
      const currentCourse = await context.actions.loadCourse(id);
      this.setState({ currentCourse , currentCourseOwner: currentCourse.User });
    } catch(err) {
      console.log(err);
    }
  }

  async deleteCourse() {
    try {
      const { id } = this.props.match.params;
      const { context } = this.props;
      const { authenticatedUser } = context;

      // const decoded = 
      // currently using credntials: joe@smith.com | joepassword 
      // const response = await context.actions
        // .deleteCourse(id, authenticatedUser.emailAddress, 'joepassword');
      // console.log("deleted ", response);
      // this.props.history.push("/");
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { currentCourse, currentCourseOwner } = this.state;
    const { authenticatedUser } = this.props.context;

    return (
      <div>
        <CourseActionsBar
          authenticatedUser={authenticatedUser}
          currentCourseOwner={currentCourseOwner}
          currentCourse={currentCourse}
          deleteCourse={this.deleteCourse}
        />
        
        <CourseDetailBody 
          currentCourse={currentCourse}
          currentCourseOwner={currentCourseOwner}
        />
      </div>
    );
  }
  
}

export default CourseDetail;