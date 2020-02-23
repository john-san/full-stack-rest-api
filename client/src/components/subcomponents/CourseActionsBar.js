import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default ({
  authenticatedUser,
  user,
  course,
  deleteCourse
}) => {
  // check visitor's auth to make sure we display appropriate actions
  const isVisitorAuthorized = () => {
    return authenticatedUser && authenticatedUser.id === user.id;
  }

  return (
    <div className="actions--bar">
      <div className="bounds">
        <div className="grid-100">
          {/* inline render: https://stackoverflow.com/questions/28258465/how-to-add-logical-if-statement-when-rendering-react-components */}
          {
            isVisitorAuthorized() &&
              <Fragment>
                <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                <button className="button" onClick={deleteCourse}>Delete Course</button>
              </Fragment>
          }
          <Link className="button button-secondary" to="/">Return to List</Link>
        </div>
      </div>
    </div>
  );
}