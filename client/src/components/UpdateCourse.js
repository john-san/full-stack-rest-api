import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import CourseForm from './subcomponents/CourseForm';

class UpdateCourse extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      course: {},
      user: {}
    }

    this.getCourse();
  }

  async getCourse() {
    const { id } = this.props.match.params;
    const { data } = await axios(config.apiBaseUrl + "/courses/" + id);
    this.setState({ course: data , user: data.User });
  }
  render() {
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        
        <CourseForm 
          match={this.props.match} 
          history={this.props.history}
          course={this.state.course}   
        />
      </div>
    );

  }
}

export default UpdateCourse;