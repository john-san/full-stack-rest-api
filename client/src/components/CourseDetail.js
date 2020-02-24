import React, { Component } from 'react';
import CourseActionsBar from './subcomponents/CourseActionsBar';
import CourseDetailBody from './subcomponents/CourseDetailBody';

export default class CourseDetail extends Component {
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
      const currentCourse = await context.actions.getCourse(id);
      this.setState({ currentCourse , currentCourseOwner: currentCourse.User });
    } catch(err) {
      console.log(err);
    }
  }

  async deleteCourse() {
    try {
      const { id } = this.props.match.params;
      const { context } = this.props;
      const { emailAddress, password } = context.authenticatedUser;
      
      const response = await context.actions
        .deleteCourse(id, emailAddress, password);
      console.log("deleted ", response);
      this.props.history.push("/");
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