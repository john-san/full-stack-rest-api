import React from 'react';
import axios from 'axios';
import config from '../config';

const CourseList = () => {

  async function getCourses() {
    return await axios(config.apiBaseUrl + "/courses");
  }
  let data;
  getCourses()
    .then(res => {
      console.log(res.data);
      data = res.data;
    });
  
  
  return (
    <div className="courseList">
      <h2>Course List</h2>
      {
        data ?
        <ul>
          {data.map((course, idx) => {
            return <li key={idx}>{course.title}</li>
          })}
        </ul>
        :
        false
      }
      
    </div>
  );
}

export default CourseList;