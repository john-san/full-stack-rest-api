import React, { Component } from 'react';
import CourseForm from './subcomponents/CourseForm';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCourse: {},
      currentCourseOwner: {}
    }

   this.getCourse();
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

  render() {
    const { match, history } = this.props;
    const { currentCourse } = this.state;

    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        
        <CourseForm 
          match={match} 
          history={history}
          currentCourse={currentCourse}
          submitButtonText="Update Course"
          method="put"
        />
      </div>
    );

  }
}

export default UpdateCourse;