import React, { Component } from 'react';
import axios from 'axios';
import config from '../config';

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
    console.log(data);
    this.setState({ courses: data });
  }
  
  render() {
    return (
      <div className="bounds">
        {
          this.state.courses ?
            
              this.state.courses.map((course, idx) => {
                return (
                  <div key={idx} className="grid-33">
                    <a className="course--module course--link" href={`/courses/view/${course.id}`}>
                      <h4 className="course--label">Course</h4>
                      <h3 className="course--title">{course.title}</h3>
                    </a>
                  </div>
                );
              })
          :
            <div></div>
        }
        
        <div className="grid-33">
          <a className="course--module course--add--module" href="/courses/new">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </a>
        </div>
      </div>
    );
  }
  
}

export default Courses;