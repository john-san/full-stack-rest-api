import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import config from '../config';

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
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <a className="button" href={`/courses/${this.state.course.id}/update`}>Update Course</a>
              <button className="button" onClick={this.deleteCourse}>Delete Course</button>
              <a className="button button-secondary" href="/">Return to List</a>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {`${this.state.user.firstName} ${this.state.user.lastName}`}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ReactMarkdown source={this.state.course.materialsNeeded} />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
}

export default CourseDetail;