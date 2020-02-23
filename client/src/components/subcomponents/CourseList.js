import React from 'react';
import { Link } from 'react-router-dom';

export default ({ courses }) => {
  return (
    courses &&
      courses.map((course, idx) => {
        return (
          <div key={idx} className="grid-33">
            <Link className="course--module course--link" to={`/courses/${course.id}/view`}>
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          </div>
        );
      })
  );
}