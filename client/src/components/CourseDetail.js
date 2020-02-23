import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';
import CourseActionsBar from './subcomponents/CourseActionsBar';
import CourseDetailBody from './subcomponents/CourseDetailBody';

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      course: {},
      user: {}
    }

    this.getCourse();
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  async getCourse() {
    const { id } = this.props.match.params;
    const { data } = await axios(config.apiBaseUrl + "/courses/" + id);
    this.setState({ course: data , user: data.User });
  }

  async deleteCourse() {
    try {
      const { id } = this.props.match.params;
      const url = `${config.apiBaseUrl}/courses/${id}`;
      const response = await axios.delete(url, {
        auth: {
          username: 'joe@smith.com',
          password: 'joepassword'
        }
      });

      console.log("deleted ", response);
      this.props.history.push("/");
    } catch(err) {
      console.log(err);
    }
  }

  render() {
    const { course, user } = this.state;
    const { authenticatedUser } = this.props.context;

    return (
      <div>
        <CourseActionsBar
          authenticatedUser={authenticatedUser}
          user={user}
          course={course}
          deleteCourse={this.deleteCourse}
        />
        
        <CourseDetailBody 
          course={course}
          user={user}
        />
      </div>
    );
  }
  
}

export default CourseDetail;