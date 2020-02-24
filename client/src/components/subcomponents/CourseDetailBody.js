import React from 'react';
import ReactMarkdown from 'react-markdown';

export default ({ currentCourse, currentCourseOwner }) => {
  return (
    <div className="bounds course--detail">
      <div className="grid-66">
        <div className="course--header">
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{currentCourse.title}</h3>
          <p>By {`${currentCourseOwner.firstName} ${currentCourseOwner.lastName}`}</p>
        </div>
        <div className="course--description">
          <ReactMarkdown source={currentCourse.description} />
        </div>
      </div>
      <div className="grid-25 grid-right">
        <div className="course--stats">
          <ul className="course--stats--list">
            <li className="course--stats--list--item">
              <h4>Estimated Time (Hours)</h4>
              <h3>{currentCourse.estimatedTime}</h3>
            </li>
            <li className="course--stats--list--item">
              <h4>Materials Needed</h4>
              <ReactMarkdown source={currentCourse.materialsNeeded} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
