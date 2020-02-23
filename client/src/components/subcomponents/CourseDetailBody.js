import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({ course, user }) => {
  return (
    <div className="bounds course--detail">
      <div className="grid-66">
        <div className="course--header">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
          <p>By {`${user.firstName} ${user.lastName}`}</p>
        </div>
        <div className="course--description">
          <ReactMarkdown source={course.description} />
        </div>
      </div>
      <div className="grid-25 grid-right">
        <div className="course--stats">
          <ul className="course--stats--list">
            <li className="course--stats--list--item">
              <h4>Estimated Time</h4>
              <h3>{course.estimatedTime}</h3>
            </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <ReactMarkdown source={course.materialsNeeded} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
